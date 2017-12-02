var fs = require('fs');
var util = require('util');
var pedido = {
	pedidos: [],
	create: function(pedido){
		var obj = JSON.parse(JSON.stringify(pedido));
		console.log(obj);
		
		var file = require('./pedidos.json')

		//New objeto
		var newobj = {"id":obj.id, "items":[{"id": 1, "nome": "Produto 1", "qtd": 1, "vl": 10}], "status":obj.status,"endereco":obj.endereco,"data_entrega":obj.data_entrega}
		file.push(newobj);
		var fobj = JSON.stringify(file)
		console.log(fobj);

		//Escreve no arquivo
		fs.writeFileSync('./models/pedidos.json', fobj , 'utf-8');
	},
	getAll: function(){

		var config = require('./pedidos.json');
		var obj = JSON.parse(JSON.stringify(config));
		console.log(obj);
		return obj;
		
	},
	createId : function(){
		var lastPedido = pedidos[pedidos.length-1];

		return lastPedido.id+1;
	},
	getStatus: function(){
		return {
			0: 'pendente',
			1: 'pago',
			2: 'despachado',
			3: 'entregue'
		}
	},
	update_reaj_status: function(update_pedido){
		var obj = JSON.parse(JSON.stringify(update_pedido));
		console.log("update_pedido"+JSON.stringify(obj));

		var file = require('./pedidos.json')

		var i = 0;

		for (i=0; i<file.length; i++){
			if(obj.id == file[i].id){
				console.log("find"+JSON.stringify(file[i]));
				file[i].status = obj.status;
				file[i].data_entrega = obj.data_entrega;

			}

		}
		var fobj = JSON.stringify(file)
		fs.writeFileSync('./models/pedidos.json', fobj , 'utf-8');

	},
	cancel: function(update_pedido){
		var obj = JSON.parse(JSON.stringify(update_pedido));
		console.log("update_pedido"+JSON.stringify(obj));

		var file = require('./pedidos.json')

		var i = 0;

		for (i=0; i<file.length; i++){
			if(obj.id == file[i].id){
				console.log("find"+JSON.stringify(file[i]));
				file[i].status = "cancelado";
			}

		}
		var fobj = JSON.stringify(file)
		fs.writeFileSync('./models/pedidos.json', fobj , 'utf-8');

	}

}

module.exports = pedido