$(document).ready(function () {

    const radioPos1 = 'radioPos1'
    const radioPos2 = 'radioPos2'
    const radioPos3 = 'radioPos3'
    const radioPos4 = 'radioPos4'
    const radioPos5 = 'radioPos5'
    const radioPos6 = 'radioPos6'
    const openTop = 'openTop'
    const openRight = 'openRight'
    const openBottom = 'openBottom'
    const openLeft = 'openLeft'


    let widgetProperties = {
        mainIcon: '',
        mainBackground: '#000000',
        mainColor: '',
        pulsating: '',
        buttonPosition: '',
        buttonDirection: 'bottom',
        buttonSize: 2,
    }

    let buttonFunctions = {
        changeButtonSize(sizeValue){
            
            $('.main__widget')[0].style.padding = sizeValue * 10 + 'px'
            $('.main__widget i')[0].style.fontSize = sizeValue * 25 + 'px'
        },
        changeAddButtonSize(sizeValue){
            $('.add__widget').css('padding' , sizeValue * 10 + 'px')
            $('.widget__icon_add').children('i').css('font-size' , sizeValue * 25 + 'px')
            $('.add__buttons').css( widgetProperties.buttonDirection , widgetProperties.buttonSize * (widgetProperties.buttonSize < 1.5 ? 80 : 60) + 'px' ) 
            $('.add__buttons').children(`.add__widget`)[0].style.width = widgetProperties.buttonSize * 25 * 1.8 + 'px';
            $('.add__buttons').children(`.add__widget`)[0].style.height = widgetProperties.buttonSize * 25 * 1.8 + 'px';
        },
        changeButtonBackground(backgroundColor, color){
            widgetProperties.mainBackground = backgroundColor;
            widgetProperties.mainColor = color;

            $('.main__widget')[0].style.backgroundColor = backgroundColor;
            $('.widget__icon i')[0].style.color = color;
        },
        changeButtonIcon(icon){
            widgetProperties.mainIcon = icon;
            $('.widget__icon')[0].innerHTML = icon;
            $('.widget__icon').children('i')[0].style.fontSize = widgetProperties.buttonSize * 25 + 'px';
            $('.widget__icon i')[0].style.color = widgetProperties.mainColor;
            $('.main__widget')[0].style.width = widgetProperties.buttonSize * 25 * 1.8 + 'px';
            $('.main__widget')[0].style.height = widgetProperties.buttonSize * 25 * 1.8 + 'px';
        },
        changeAddButtonBackground(backgroundColor, color, id){
            // widgetProperties.Background = backgroundColor;
            // widgetProperties.mainColor = color;

            $(`.add__buttons`).children(`#${id}`)[0].style.backgroundColor = backgroundColor;
            $(`.add__buttons`).children(`#${id}`).children(`.widget__icon_add`)[0].style.color = color;
        },
        changeAddButtonIcon(icon, color, id){
            console.log(id);
            
            $('.add__buttons').children(`#${id}`).children('.widget__icon_add')[0].innerHTML = icon;
            $('.add__buttons').children(`#${id}`).children('.widget__icon_add').children('i')[0].style.fontSize = widgetProperties.buttonSize * 25 + 'px';
            $('.add__buttons').children(`#${id}`).children('.widget__icon_add')[0].style.color = color;
            $('.add__buttons').children(`#${id}`)[0].style.width = widgetProperties.buttonSize * 25 * 1.8 + 'px';
            $('.add__buttons').children(`#${id}`)[0].style.height = widgetProperties.buttonSize * 25 * 1.8 + 'px';
        },
        changeButtonPosition(top , right, bottom, left){
            $('.widget__block')[0].style.top = top
            $('.widget__block')[0].style.right = right
            $('.widget__block')[0].style.bottom = bottom
            $('.widget__block')[0].style.left = left
        },
        createNewButton(icon = '<i class="far fa-comment-alt"></i>', background = '#000', color = '#fff', id){
            console.log(icon , background, color);
            
            return $(`<a id="${id}" class="add__widget" style="box-sizing: border-box;cursor: pointer; padding: 20px; background: ${background}; color: ${color};border-radius: 50%;">
                    <div class="widget__icon_add" >
                        ${icon}
                    </div>
                </a>`
            )
        },
    }

    for (let i = 0; i < awesomeFonts.length; i++) {
        $('<div class="symbol__piece"><i class="' + awesomeFonts[i] + '"></i></div>').appendTo('.symbols__block')
    }
    
    
    

    $('.main__button_pulse').children('input').on('change', function(){
        console.log(this.checked);
        
        if (this.checked){
            $('.main__widget')[0].style.animation = 'pulsating 5s ease 0.5s infinite'
        }else if (!this.checked){
            $('.main__widget')[0].style.animation = null    
        }
    })

    $('.popup__block').on('change', function () {
        let bgColorInput = $('#addBackgroundInput', this).val()
        $('.add__button_icon', this)[0].style.backgroundColor = bgColorInput
        let colorInput = $('#addColorInput', this).val()
        $('.add__button_icon', this)[0].style.color = colorInput
    })


    let changePulseColor = (color) => {
        
        
        let pulseColor = $(`
        <style>@keyframes pulsating{
            0%{
                box-shadow: 0 0 0 ${color};
            }
            50%{
                box-shadow: 0 0 20px ${color};
            
            }
            100%{
                box-shadow: 0 0 0px ${color};
    
            }}<style>`)

        pulseColor.remove('head')
        pulseColor.appendTo('head')
    }
    
    changePulseColor(widgetProperties.mainBackground)
    

    $('.main__button').on('change', function () {
        widgetProperties.mainBackground = $('#backgroundInput', this).val();
        widgetProperties.mainColor = $('#colorInput', this).val();

        $('.main__button_icon', this)[0].style.backgroundColor = widgetProperties.mainBackground;
        $('.main__button_icon', this)[0].style.color = widgetProperties.mainColor;
        changePulseColor(widgetProperties.mainBackground)

        buttonFunctions.changeButtonBackground(widgetProperties.mainBackground, widgetProperties.mainColor);

    })


    let symbolsFill = (background = 'backgroundColor: #000', innerHtml = '<i style="font-size: 20px;" class="far fa-comment-alt"></i>', name = '', id) => {

        let symbolsConstructor = []
        for (let i = 0; i < awesomeFonts.length; i++) {
            symbolsConstructor.push('<div class="symbol__piece"><i class="' + awesomeFonts[i] + '"></i></div>')
        }

        return $(`<div class="popup__block" style="display:none; margin: 30px auto">
        <div class="popup__top">
          <div id="${id}" class="close__popup">
            <i class="fas fa-times"></i>
          </div>
          <input value="${name}" type="text">
        </div>
        <div class="popup__bot">
          <div class="add__button_settings">
            <div class="add__button_icon" style="background-color:${background}">${innerHtml}</div>
            <input placeholder="enter http link" type="url">
            <div class="symbols__popup">
              <div class="filter__popup" style="display:none">
                <input type="search" name="" placeholder="Type to filter" id=""> </div>
              <hr style="display:none">
              <div id="${id}" class="symbols__block">${symbolsConstructor.join('')} </div>
            </div>
          </div>
          <div class="add__button_style">
            <div class="add__button_background">
              <div class="">BACKGROUND:</div>
              <input id="addBackgroundInput" value="${background}"  type="color">
            </div>
            <div class="add__button_color">
              <div class="">ICON COLOR:</div>
              <input id="addColorInput" value="#ffffff" type="color">
            </div>
            <div class="add__button_tab">
              <label class="">OPEN IN NEW WINDOW</label>
              <input type="checkbox">
            </div>
          </div>
        </div>
      </div>`)

    }
    
    $('.template__button').on('click', function godFunction () {

        let newValue = []
        for (let i = 0; i < this.attributes.style.value.length - 1; i++) {
            if (this.attributes.style.value[i] == '#') {
                for (let k = 0; k <= 6; k++) {
                    newValue.push(this.attributes.style.value[i + k])
                }
            }
        }
        background = newValue.join('')

        let name = $('.button__name', this).text()
        
        let unicId = Math.floor(Math.random(0,10) * 10000)
        console.log(unicId);
        
        
        symbolsFill(background, this.innerHTML, name, unicId).on('change', function (e) {
            let bgColorInput = $('#addBackgroundInput', this).val()
            $('.add__button_icon', this)[0].style.backgroundColor = bgColorInput
            let colorInput = $('#addColorInput', this).val()
            $('.add__button_icon', this)[0].style.color = colorInput
            buttonFunctions.changeAddButtonBackground(bgColorInput, colorInput, unicId)
        }).appendTo('.add__button_popup').slideToggle(1000)
        $('.add__button_icon').on('click', function (e) {
            let currentTarget = e.delegateTarget.parentElement
            $(currentTarget).children('.symbols__popup').fadeIn(1000)
        })
        $('.close__popup').on('click', function (e) {
            let currentTarget = e.delegateTarget.parentElement
            let currentId = e.currentTarget.id
            
            $(`.widget__block`).children('.add__buttons').children(`#${currentId}`).remove()

            $(currentTarget).parent().slideUp(1000)
        })
        $('.symbols__popup').children(`#${unicId}`).children('.symbol__piece').on('click', function (e) {
            let newSymbol = this.innerHTML;
            let currentTarget = e.delegateTarget.parentElement
            $(currentTarget).parent().parent().children('.add__button_icon')[0].innerHTML = newSymbol
            let bgColorInput = $('#addBackgroundInput', this).val()
            buttonFunctions.changeAddButtonIcon(newSymbol, bgColorInput , unicId)
        });
        $('.add__button_settings').children('input').on('change', function(){
            let link = this.value
            console.log(link);
            
            $('.add__buttons').children(`#${unicId}`).attr("href" , `${link}`)

        })
        $('.add__button_tab').children('input').on('change', function(){
            if(this.checked){
                $('.add__buttons').children(`#${unicId}`).attr("target" , `_blank`)
            }else if(!this.checked){
                $('.add__buttons').children(`#${unicId}`).attr("target" , `_self`)
            }
        })
        $('.popup__top').children('input').on('change', function(){
            title = this.value
            $('.add__buttons').children(`#${unicId}`).attr("title" , `${title}`)
        })
        buttonFunctions.createNewButton(this.innerHTML , background, '#fff', unicId ).appendTo('.add__buttons');
        buttonFunctions.changeAddButtonSize(widgetProperties.buttonSize)
    })

    $('.app__block button').on('click', function (e) {
        
        let unicId = Math.floor(Math.random(0,10) * 10000)
        console.log(unicId);
        

        symbolsFill(undefined,undefined,undefined, unicId).on('change', function () {

            let bgColorInput = $('#addBackgroundInput', this).val()
            $('.add__button_icon', this)[0].style.backgroundColor = bgColorInput
            let colorInput = $('#addColorInput', this).val()
            $('.add__button_icon', this)[0].style.color = colorInput
            buttonFunctions.changeAddButtonBackground(bgColorInput, colorInput, unicId)
        }).appendTo('.add__button_popup').slideToggle(1000)
        
        $('.add__button_icon').on('click', function (e) {
            let currentTarget = e.delegateTarget.parentElement
            $(currentTarget).children('.symbols__popup').fadeIn(1000)
        })
        $('.close__popup').on('click', function (e) {
            let currentTarget = e.delegateTarget.parentElement
            let currentId = e.currentTarget.id
            $(`.widget__block`).children('.add__buttons').children(`#${currentId}`).remove()
            $(currentTarget).parent().slideUp(1000)
        })
        $('.symbols__popup').children(`#${unicId}`).children('.symbol__piece').on('click', function (e) {
            let newSymbol = this.innerHTML;
            let currentTarget = e.delegateTarget.parentElement
            $(currentTarget).parent().parent().children('.add__button_icon')[0].innerHTML = newSymbol
            let bgColorInput = $('#addBackgroundInput', this).val()
            console.log(bgColorInput)
            buttonFunctions.changeAddButtonIcon(newSymbol, bgColorInput , unicId)
        });
        $('.add__button_settings').children('input').on('change', function(){
            let link = this.value
            console.log(link);
            
            $('.add__buttons').children(`#${unicId}`).attr("href" , `${link}`)

        })
        $('.add__button_tab').children('input').on('change', function(){
            if(this.checked){
                $('.add__buttons').children(`#${unicId}`).attr("target" , `_blank`)
            }else if(!this.checked){
                $('.add__buttons').children(`#${unicId}`).attr("target" , `_self`)
            }
        })
        $('.popup__top').children('input').on('change', function(){
            title = this.value
            $('.add__buttons').children(`#${unicId}`).attr("title" , `${title}`)
        })
        buttonFunctions.createNewButton(undefined, undefined, undefined, unicId ).appendTo('.add__buttons');
        buttonFunctions.changeAddButtonSize(widgetProperties.buttonSize)
    })



    $('.main__button_icon').on('click', function () {
        $('.symbols__popup', '.main__button_settings').fadeIn()
    })



    $('.symbol__piece').on('click', function () {
        let newSymbol = this.innerHTML;
        console.log(newSymbol);
        $('.symbol__piece').parent().parent().parent().children('.main__button_icon')[0].innerHTML = newSymbol
        buttonFunctions.changeButtonIcon(newSymbol)
    })

    $(document).mouseup(function (e) {
        let block = $('.symbols__popup')
        if (!block.is(e.target) && block.has(e.target).length === 0) {
            $('.symbols__popup').fadeOut();
        }
        e.stopPropagation();
    })

    

    $('.range__size').on('change', function(){
        widgetProperties.buttonSize = this.value
        console.log(this.value);
        
        buttonFunctions.changeButtonSize(widgetProperties.buttonSize);
        $('.main__widget')[0].style.width = widgetProperties.buttonSize * 25 * 1.8 + 'px';
        $('.main__widget')[0].style.height = widgetProperties.buttonSize * 25 * 1.8 + 'px';

        if($('.add__buttons add__widget').lenght == 0){
            return
        }else{
            buttonFunctions.changeAddButtonSize(widgetProperties.buttonSize);
            $('.add__buttons').children('.add__widget').css({
             'height' : widgetProperties.buttonSize * 25 * 1.8 + 'px' ,
             'width' : widgetProperties.buttonSize * 25 * 1.8 + 'px'})
        }

       

    })

    $('.main__widget').on('click', function(){
        $('.add__buttons').fadeToggle()
    })

    $('.opening__direction').children('input').on('click', function(e){
        let currentId = e.currentTarget.id
        let targetEl = $('.add__buttons')
        switch(currentId){
            case openTop:
                widgetProperties.buttonDirection = 'bottom'
                targetEl.removeAttr('style')
                targetEl.css({'display':'flex', 'flex-direction':'column-reverse', 'position': 'absolute'})
                targetEl.css( widgetProperties.buttonDirection , widgetProperties.buttonSize * (widgetProperties.buttonSize < 1.5 ? 80 : 60) + 'px' ) 
                break
            case openRight:
                widgetProperties.buttonDirection = 'left'
                targetEl.removeAttr('style')
                targetEl.css({'display':'flex', 'flex-direction':'row', 'position': 'absolute'})
                targetEl.css( widgetProperties.buttonDirection , widgetProperties.buttonSize * (widgetProperties.buttonSize < 1.5 ? 80 : 60) + 'px' ) 
                break
            case openBottom:
                widgetProperties.buttonDirection = 'top'
                targetEl.removeAttr('style')
                targetEl.css({'display':'flex', 'flex-direction':'column', 'position': 'absolute'})
                targetEl.css( widgetProperties.buttonDirection , widgetProperties.buttonSize * (widgetProperties.buttonSize < 1.5 ? 80 : 60) + 'px' ) 
                break
            case openLeft:
                widgetProperties.buttonDirection = 'right'
                targetEl.removeAttr('style')
                targetEl.css({'display':'flex', 'flex-direction':'row-reverse', 'position': 'absolute'})
                targetEl.css( widgetProperties.buttonDirection , widgetProperties.buttonSize * (widgetProperties.buttonSize < 1.5 ? 80 : 60) + 'px' ) 
                break
            default:
                return
        }
    })

    
    $('.get__code').children('button').on('click', function(){
        let resultCode = $('.app').children('.widget').html()
        resultCode += `<script src="https://code.jquery.com/jquery-3.5.1.min.js"
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script><script>$('<style>@keyframes pulsating{0%{box-shadow: 0 0 0 ${widgetProperties.mainBackground};}50%{box-shadow: 0 0 20px ${widgetProperties.mainBackground};}100%{box-shadow: 0 0 0px ${widgetProperties.mainBackground};}}<style>').appendTo('head'); $('.add__buttons').fadeToggle();$('.main__widget').on('click',function(){$('.add__buttons').fadeToggle(500)}) </script>`
        resultCode += `<script>$('head').append('<script src="https://kit.fontawesome.com/f47a5f8a7f.js" crossorigin="anonymous"><\\/script>'); $('.main__widget')[0].style.animation = 'pulsating 5s ease 0.5s infinite'</script>`
        console.log(resultCode)
        $('#getCode')[0].value = resultCode
    })

    $('.button__position form input').on('click', function (e) {
        console.log(e.target.id);
        switch(e.target.id){
            case radioPos1:
                widgetProperties.buttonPosition = ['30px', null, null, '30px']
                buttonFunctions.changeButtonPosition(...widgetProperties.buttonPosition)
                break
            case radioPos2:
                widgetProperties.buttonPosition = ['45vh', null, null, '30px']
                buttonFunctions.changeButtonPosition(...widgetProperties.buttonPosition)
                break
            case radioPos3:
                widgetProperties.buttonPosition = [null, null, '30px', '30px']
                buttonFunctions.changeButtonPosition(...widgetProperties.buttonPosition)
                break
            case radioPos4:
                widgetProperties.buttonPosition = ['30px', '30px', null, null]
                buttonFunctions.changeButtonPosition(...widgetProperties.buttonPosition)
                break
            case radioPos5:
                widgetProperties.buttonPosition = ['45vh', '30px', null, null]
                buttonFunctions.changeButtonPosition(...widgetProperties.buttonPosition)
                break
            case radioPos6:
                widgetProperties.buttonPosition = [null, '30px', '30px', null]
                buttonFunctions.changeButtonPosition(...widgetProperties.buttonPosition)
                break
            default:
                return
        }
    })
})