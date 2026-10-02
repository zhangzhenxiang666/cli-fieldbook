  const dialog=document.querySelector('#fieldbook-search');
  const query=document.querySelector('#search-query');
  const scope=document.querySelector('#search-scope');
  const list=document.querySelector('#search-results');
  const status=document.querySelector('#search-status');
  const base=dialog.dataset.base;
  const open=()=>{dialog.showModal();query.focus();};
  document.querySelector('#search-open')?.addEventListener('click',open);
  document.querySelector('#search-close')?.addEventListener('click',()=>dialog.close());
  // Handle Escape explicitly because another page-level shortcut can cancel the
  // browser's native dialog cancellation event.
  dialog.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();dialog.close();}});
  document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();if(!dialog.open)open();}});
  let index;
  let pagefind;
  let sequence=0;
  let timer;
  function allowed(r){return scope.value==='all'||!dialog.dataset.tool||(r.tool===dialog.dataset.tool&&r.version===dialog.dataset.version);}
  function render(results) {
    list.replaceChildren();
    for(const result of results){
      const li=document.createElement('li');const a=document.createElement('a');a.href=result.url;a.textContent=result.title;
      const meta=document.createElement('small');meta.textContent=`${result.tool} · ${result.version} · ${result.kind}`;
      li.append(a,meta);
      if(result.excerpt){const p=document.createElement('p');p.textContent=result.excerpt.replace(/<[^>]*>/g,'');li.append(p);}
      list.append(li);
    }
    status.textContent=results.length?`显示 ${results.length} 条结果。`:'没有匹配内容；可以扩大搜索范围。';
  }
  async function search() {
    const ticket=++sequence;const text=query.value.trim();if(!text){list.replaceChildren();status.textContent='输入关键词开始搜索。';return;}
    status.textContent='正在搜索…';
    try{
      index??=fetch(`${base}/generated/identifiers.json`).then(r=>{if(!r.ok)throw new Error('索引不可用');return r.json();});
      const terms=await index;
      const lowered=text.toLocaleLowerCase();
      const exact=terms.filter(r=>allowed(r)&&r.term?.toLocaleLowerCase().includes(lowered)).sort((a,b)=>Number(b.term?.toLocaleLowerCase()===lowered)-Number(a.term?.toLocaleLowerCase()===lowered));
      let full=[];
      try {
        pagefind??=import(/* @vite-ignore */ `${base}/pagefind/pagefind.js`);
        const api=await pagefind;
        const filters=scope.value==='current'&&dialog.dataset.tool?{tool:dialog.dataset.tool,version:dialog.dataset.version}:{};
        const response=await api.search(text,{filters});
        const data=await Promise.all(response.results.slice(0,12).map((r)=>r.data()));
        full=data.map((r)=>({title:r.meta.title,url:r.url,tool:r.filters.tool?.[0]??'',version:r.filters.version?.[0]??'',kind:r.filters.kind?.[0]??'',excerpt:r.excerpt})).filter(allowed);
      } catch(error) { console.warn('Pagefind query failed',error);if(!exact.length)throw new Error('全文索引加载失败，请刷新重试。'); }
      if(ticket!==sequence)return;
      const unique=[...new Map([...exact,...full].map(r=>[r.url,r])).values()].slice(0,20);render(unique);
    }catch(e){if(ticket===sequence){list.replaceChildren();status.textContent=String(e);}}
  }
  query.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(()=>void search(),160);});
  scope.addEventListener('change',()=>void search());
