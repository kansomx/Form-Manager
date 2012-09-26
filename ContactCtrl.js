
/*
* Una librería para administración del funcionamiento de formas de contacto.
* Dependencias: jQuery
* 
* 
* 
*/

var ContactCtrl = {
	
	btn_submit: null,
	form_el: null,

	config: {
		fields: [],
		btn_submit_selector: '#submit',
		enable_ajax_submit: false,
		url: null,
		form_selector: 'form',
		ajax: {
			success: function()
			{
				alert('Mensaje enviado.');
			},
			error: function()
			{
				alert('Ocurrio un error al enviar los datos');
			}
		},
		submit: function(){
			console.log('Llamada a ContactCtrl.config.submit');
			return false;
		},
		ajax_submit: function()
		{
			/* Simple ajax submition */
			var data = ContactCtrl.form_el.serialize();
			$.ajax({
				url: ContactCtrl.config.url,
				method: 'post',
				success: function(){
					ContactCtrl.config.ajax.success();
				},
				error: function()
				{
					ContactCtrl.config.ajax.error();
				}
			});
			return false;
		}
	},
	is_text: function( input)
	{
		var val = input.val();
		if(val != '' && val.length  > 0)
			return true;

		return false;
	},
	is_mail: function( input)
	{
		return true;
	},
	option_selected: function( select)
	{
		// validates at least one element from a <select> is selected 
		// validates is not the first is .val() == ''

	},
	init: function( config){
		$.extend(ContactCtrl.config, config);

		console.log(ContactCtrl.config.form_selector);

		ContactCtrl.form_el = $(ContactCtrl.config.form_selector);
		console.log(ContactCtrl.form_el);

		if(!ContactCtrl.config.url)
		{
			ContactCtrl.config.url = ContactCtrl.form_el.prop('action');
		}

		ContactCtrl.form_el.submit( ContactCtrl.submit);
	},
	submit: function(){
		if(ContactCtrl.validate())
		{
			// If form passes validation, submit !
			if(ContactCtrl.config.enable_ajax_submit)
			{
				// enviar por ajax
				return ContactCtrl.config.ajax_submit();
			}else{
				ContactCtrl.config.submit();
				return true;
			}
			
		}else{
			return false;
		}
		
	},
	validate: function()
	{
		/*
		El metodo debe regresar TRUE si la validación es correcta
		*/
		return true;
	},

};


