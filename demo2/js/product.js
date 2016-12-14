var products = (function(){

    var filter = ['Tivi', 'Laptop', 'Máy Giặt'];

    // establish variables 
    var getInput = document.getElementById('newProductTextbox');
    var products = document.getElementById('products');

    // add item
    function addItem(){
        if(getInput.value.length > 0)  {
          liElement(getInput.value);
          filter.push(getInput.value);
          countUpdate();
          getInput.value = '';
        }
    }

    // remove item
    function removeItem(){
        var parent = this.parentNode.parentNode;
        var child = this.parentNode;
        parent.removeChild(child);
        countUpdate();
    }

    // create li item
    function liElement(input){
        // establish variable 
        var listItem = document.createElement('li');
        var closeItem = document.createElement('span');
        var name = document.createElement('span');
        var count = document.createElement('span');

        // append count
        count.className = "count";
        listItem.appendChild(count);

        //append delete-link
        closeItem.className = "delete-link";
        closeItem.innerText = "X";
        listItem.appendChild(closeItem);
        closeItem.addEventListener('click', function(){
            removeItem.call(this);
        })

        // append name 
        name.className = "name";
        name.innerText = input;
        listItem.appendChild(name);
        //alert(listItem);
       	document.getElementById('products').appendChild(count);
    }

    // count update in li
    function countUpdate(){
        var getList = document.querySelectorAll('#products li');
        var count = 1;
        for(var i=0; i<getList.length; i++){
            getList[i].childNodes[0].innerText = count;
            count++;
        }
    }

    // render defaults items (already exits in filter array) on page load
    function defaultItems(){
        for(var i=0; i<filter.length; i++){
            liElement(filter[i]);
        }
        countUpdate();
    }
    
    defaultItems();

    // return object property
    return {
        addItem: addItem
    }	

})();


// Usages add event to add button 
document.getElementById('btnAdd').addEventListener('click', function(){
    products.addItem();
})
// attach event to input field when user keystroke enter
document.getElementById('newProductTextbox').addEventListener('keyup', function(event){
  event.preventDefault();
  if(event.keyCode == 13){
    products.addItem();
  }
})