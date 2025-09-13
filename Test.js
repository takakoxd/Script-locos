(function(){
    // Cria o tooltip
    const tooltip = document.createElement('div');
    tooltip.style.position = 'fixed';
    tooltip.style.background = 'rgba(0,0,0,0.8)';
    tooltip.style.color = '#ff0';
    tooltip.style.padding = '4px 8px';
    tooltip.style.border = '1px solid #ff0';
    tooltip.style.borderRadius = '6px';
    tooltip.style.fontFamily = 'monospace';
    tooltip.style.fontSize = '12px';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.zIndex = 999999;
    tooltip.style.transition = '0.1s';
    tooltip.style.opacity = '0';
    document.body.appendChild(tooltip);

    // Função para mostrar o nome
    function showName(e){
        const el = e.target;
        let name = el.tagName.toLowerCase();
        if(el.id) name += '#' + el.id;
        else if(el.className) name += '.' + el.className.split(' ').join('.');
        tooltip.textContent = name;
        tooltip.style.left = (e.clientX + 10) + 'px';
        tooltip.style.top = (e.clientY + 10) + 'px';
        tooltip.style.opacity = '1';
    }

    // Função para esconder
    function hideName(){
        tooltip.style.opacity = '0';
    }

    // Eventos mouse
    document.addEventListener('mousemove', showName);
    document.addEventListener('mouseout', hideName);

    // Eventos touch (mobile)
    document.addEventListener('touchmove', e=>{
        if(e.touches.length > 0) showName(e.touches[0]);
    });
    document.addEventListener('touchend', hideName);
})();
