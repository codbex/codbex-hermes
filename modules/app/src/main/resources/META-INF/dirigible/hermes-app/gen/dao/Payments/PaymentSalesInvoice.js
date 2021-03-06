var query = require("db/v4/query");
var producer = require("messaging/v4/producer");
var daoApi = require("db/v4/dao");

var dao = daoApi.create({
	table: "CODBEX_PAYMENTSALESINVOICE",
	properties: [
		{
			name: "Id",
			column: "PAYMENTSALESINVOICE_ID",
			type: "INTEGER",
			id: true,
			autoIncrement: true,
		}, {
			name: "Payment",
			column: "PAYMENTSALESINVOICE_PAYMENT",
			type: "INTEGER",
		}, {
			name: "SalesInvoice",
			column: "PAYMENTSALESINVOICE_SALESINVOICE",
			type: "INTEGER",
		}]
});

exports.list = function(settings) {
	return dao.list(settings);
};

exports.get = function(id) {
	return dao.find(id);
};

exports.create = function(entity) {
	var id = dao.insert(entity);
	triggerEvent("Create", {
		table: "CODBEX_PAYMENTSALESINVOICE",
		key: {
			name: "Id",
			column: "PAYMENTSALESINVOICE_ID",
			value: id
		}
	});
	return id;
};

exports.update = function(entity) {
	dao.update(entity);
	triggerEvent("Update", {
		table: "CODBEX_PAYMENTSALESINVOICE",
		key: {
			name: "Id",
			column: "PAYMENTSALESINVOICE_ID",
			value: entity.Id
		}
	});
};

exports.delete = function(id) {
	dao.remove(id);
	triggerEvent("Delete", {
		table: "CODBEX_PAYMENTSALESINVOICE",
		key: {
			name: "Id",
			column: "PAYMENTSALESINVOICE_ID",
			value: id
		}
	});
};

exports.count = function() {
	return dao.count();
};

exports.customDataCount = function() {
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM CODBEX_PAYMENTSALESINVOICE");
	if (resultSet !== null && resultSet[0] !== null) {
		if (resultSet[0].COUNT !== undefined && resultSet[0].COUNT !== null) {
			return resultSet[0].COUNT;
		} else if (resultSet[0].count !== undefined && resultSet[0].count !== null) {
			return resultSet[0].count;
		}
	}
	return 0;
};

function triggerEvent(operation, data) {
	producer.queue("hermes-app/Payments/PaymentSalesInvoice/" + operation).send(JSON.stringify(data));
}