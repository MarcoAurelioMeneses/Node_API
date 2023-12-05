'use strict';

/*Lista de erros*/
let errors = [];
/*Construtor que inicializa a lista de erros*/
function ValidationContract(){
    errors = [];
}

/*Metodo requerido não poder ser menor que 0*/
ValidationContract.prototype.isRequired = (value, message) => {
    if(!value || value.length <= 0){
        errors.push({message: message});
    }
}
/*Metodo requerido tem um tamanho minimo*/
ValidationContract.prototype.hasMinLen = (value, min, message) => {
    if(!value || value.length < min){
        errors.push({message: message});
    }
}
/*Metodo requerido tem um tamanho maximo*/
ValidationContract.prototype.hasMaxLen = (value, max, message)=>{
    if(!value || value.length > max){
        errors.push({message: message});
    }
}
/*Metodo requerido tem um tamanho fixo*/
ValidationContract.prototype.hasFixedLen = (value, len, message)=>{
    if(value.length != len){
        errors.push({message: message});
    }
}
/*Metodo requerido tem um tamanho é um email*/
ValidationContract.prototype.isEmail =(value, message) =>{
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value))
        errors.push({ message: message });
}
/*Retorno da lista de erros*/
ValidationContract.prototype.errors = () => { 
    return errors; 
}
/*Clear*/
ValidationContract.prototype.clear = () => {
    errors = [];
}
/*validação*/
ValidationContract.prototype.isValid = () => {
    return errors.length == 0;
}

module.exports = ValidationContract;