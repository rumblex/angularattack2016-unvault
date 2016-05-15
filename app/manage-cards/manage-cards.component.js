function ManageCardsCtrl($scope, $rootScope, Data, Error) {
    var vm = this;
    
    vm.edit_enabled = false;
    
    vm.data = {
        'selectedCard': 0,
    }
    
    vm.updateModel = function(){
        if(vm.edit_enabled) {
            Data.get('card', vm.data.selectedCard, function(response){
                vm.data.model = response.data.card;
            });
        } else {
            vm.data.model = {
                "name": "",
                "question": "",
                "answer": ""
            };
        }
    };
    
    vm.cards = [];
    
    vm.loadCards = function(){
        Data.get('cards', null, function(response){
            vm.cards = response.data.cards;
        });
    };
    
    vm.update = function(){
        Data.put('update-card', vm.data, function(response){
            Error.info('Added', 'Card "' + response.data.card.name + '" has been added');
        }, function(result) {
            console.error('update error ', result);   
        });
    };
    
    vm.delete = function(){
        Data.delete('card', function(response){
            Error.info('Added', 'Card "' + response.data.name + '" has been added');
        }, vm.data, function(result) {
            Error.alert('Error', 'Card ' + response.data.name + ' has been added');
            console.error('delete error ', result);   
        });
    };
    
    vm.add = function(){
        Data.send('add-card', vm.data.model, function(response){
            Error.info('Deleted', 'Card has been deleted');
        }, function(result) {
            Error.alert('Error', 'An error has accured while deleting a Card');
            console.error('add error ', result);
        });
    };
 }

app.controller('ManageCardsCtrl', ManageCardsCtrl);