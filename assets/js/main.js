//array of items
const items = [];

//resets visibility of html fields
function resetVisibility(){
    document.getElementById('txtOutput').style.visibility = "hidden";
    document.getElementById('txtOutput').value = ""
    document.getElementById('serialLabel').style.visibility = "hidden";
    document.getElementById('serial').style.visibility = "hidden";
    document.getElementById('nameLabel').style.visibility = "hidden";
    document.getElementById('name').style.visibility = "hidden";
    document.getElementById('manufacturerLabel').style.visibility = "hidden";
    document.getElementById('manufacturer').style.visibility = "hidden";
    document.getElementById('weightLabel').style.visibility = "hidden";
    document.getElementById('weight').style.visibility = "hidden";
    document.getElementById('colorLabel').style.visibility = "hidden";
    document.getElementById('color').style.visibility = "hidden";
    document.getElementById('typeLabel').style.visibility = "hidden";
    document.getElementById('type').style.visibility = "hidden";
    document.getElementById('submit').style.visibility = "hidden";
    document.getElementById('txtOutput').style.visibility = "hidden";   
}

//event handler for add button
function addClick(){
    document.getElementById('header1').textContent = "Automated Logistics Management Support System (ALMSS)";
    document.getElementById('txtOutput').style.visibility = "visible";
    document.getElementById('txtOutput').value = "Click 'Submit' to add an item."
    document.getElementById('serialLabel').style.visibility = "visible";
    document.getElementById('serial').style.visibility = "visible";
    document.getElementById('nameLabel').style.visibility = "visible";
    document.getElementById('name').style.visibility = "visible";
    document.getElementById('manufacturerLabel').style.visibility = "visible";
    document.getElementById('manufacturer').style.visibility = "visible";
    document.getElementById('weightLabel').style.visibility = "visible";
    document.getElementById('weight').style.visibility = "visible";
    document.getElementById('colorLabel').style.visibility = "visible";
    document.getElementById('color').style.visibility = "visible";
    document.getElementById('typeLabel').style.visibility = "visible";
    document.getElementById('type').style.visibility = "visible";
    document.getElementById('submit').style.visibility = "visible";
}
//event handler for remove button
function removeClick(){
    resetVisibility();//resets visibility of html fields.
    document.getElementById('header1').textContent = "Automated Logistics Management Support System (ALMSS)";
    document.getElementById('txtOutput').style.visibility = "visible";
    document.getElementById('txtOutput').value = "Enter a serial number to remove one of the below the item(s)."
    document.getElementById('serialLabel').style.visibility = "visible";
    document.getElementById('serial').style.visibility = "visible";
    document.getElementById('submit').style.visibility = "visible";
}
//clears all html fields
function clearFields(){
    document.getElementById('txtOutput').value = ""
    document.getElementById('serial').value = "";
    document.getElementById('name').value = "";
    document.getElementById('manufacturer').value = "";
    document.getElementById('weight').value = "";
    document.getElementById('color').value = "";
    document.getElementById('type').value = "";
    document.getElementById('txtOutput').value = "";   
}
//event handler for home button
function homeClick(){
    resetVisibility();//resets visibility of html fields.
    document.getElementById('header1').textContent = "Welcome to the Automated Logistics Management Support System (ALMSS)!";
}
//displays all entries in items[]
function viewItems(){
    resetVisibility();//resets visibility of html fields.
    document.getElementById("txtOutput").style.visibility = "visible";
    let displayArray = [];
    for(let i = 0; i < items.length; i++){
        let itemString = "Serial: " + items[i].serial + ", Name: " + items[i].name + ", Manufacturer: "
            + items[i].manufacturer + ", Weight: " + items[i].weight + ", Color: " + items[i].color + ", Type: " + items[i].type;
        displayArray.push(itemString);//adds item to string.
    }
    let textarea = document.getElementById("txtOutput");
    textarea.value = displayArray.join("\n");
}
//check for duplicate serial number. Returns true for duplicates.
function checkDuplicate(){
    let duplicateCount = 0;
    for (let i = items.length - 1; i >= 0; --i) {
        if(items[i].serial == parseInt(document.getElementById('serial').value)) {
            duplicateCount++;
        }
    }
    if(duplicateCount > 0){//duplicate
        return true;
    }
    else{//unique
        return false
    }
}
//event handler for the submit button
function submitClick(){
    if(document.getElementById('serial').value != "" &&
        document.getElementById('name').value != "" &&
        document.getElementById('manufacturer').value != "" &&
        document.getElementById('weight').value != "" &&
        document.getElementById('color').value != "" &&
        document.getElementById('type').value != "" ){
        let item = {
            serial: document.getElementById('serial').value,
            name: document.getElementById('name').value,
            manufacturer: document.getElementById('manufacturer').value,
            weight: document.getElementById('weight').value,
            color: document.getElementById('color').value,
            type: document.getElementById('type').value
            };
        //add new item after checking for duplicate serial number.
        if(!checkDuplicate()){
            items.push(item);
            clearFields();
            document.getElementById('txtOutput').value = "The below item has been added.\n" + 
                "Serial: " + items[items.length-1].serial + ", Name: " + items[items.length-1].name + ", Manufacturer: "
                + items[items.length-1].manufacturer + ", Weight: " + items[items.length-1].weight + ", Color: " + 
                items[items.length-1].color + ", Type: " + items[items.length-1].type;
        }
        else{
            document.getElementById('txtOutput').value = "The entered serial number is a duplicate. Please update the serial number value."
        }
    }
    else if(document.getElementById('serial').value != "" &&
            document.getElementById('name').style.visibility == "hidden"){
        //delete item
        let indexCheck = false;
        let delIndex = 0;
        for (var i = items.length - 1; i >= 0; --i) {
            if (items[i].serial == parseInt(document.getElementById('serial').value)) {
                //create output string
                indexCheck = true;
                delIndex = i;
            }
        }
        if(indexCheck){//removes item from array
            let deletedItem = "The below item has been deleted.\n" + 
            "Serial: " + items[delIndex].serial + ", Name: " + items[delIndex].name + ", Manufacturer: "
            + items[delIndex].manufacturer + ", Weight: " + items[delIndex].weight + ", Color: " + 
            items[delIndex].color + ", Type: " + items[delIndex].type;
            //remove the item from the array
            items.splice(delIndex,1);
            clearFields();
            document.getElementById('txtOutput').value = deletedItem;
        }
        if(!indexCheck){//the serial number doesn't exists in items.
            document.getElementById('txtOutput').value = "The entered serial number doesn't exist in the system."
        }
    }
    else{//all html fields don't have a value.
        document.getElementById('txtOutput').value = "Please enter a value for the above fields."
    }
}