function printReceipt(barcodes) {
    let cartItems = countTheBarcode(barcodes);
    let cartItemDetails = readBarcodesDetailFromDatabase(barcodes);
    let cartItemDetailsWithTotalPrice = calcuateTheReceiptPrice(cartItems,cartItemDetails);
    let totalPrice = calcuateTheTotalPrice(cartItemDetailsWithTotalPrice);
    let receiptDetails = generateReceipts(cartItemDetailsWithTotalPrice);
    let receipt = formatData(receiptDetails,totalPrice);
    console.log(receipt);
}

function countTheBarcode(barcodes){
    let cartItems = new Array();
    for(let index = 0;index<barcodes.length;index++){
        let isVail = false;
        for(let cartItemIndex =0;cartItemIndex<cartItems.length;cartItemIndex++){
            if(cartItems[cartItemIndex].barCode===barcodes[index]){
                cartItems[cartItemIndex].num ++;
                isVail = true;
                break;
            }
        }
        if(!isVail){
            var cartItem = new Object;
            cartItem.barCode = barcodes[index];
            cartItem.num = 1;
            cartItems.push(cartItem);
        }
        
    }
    return cartItems;
}

function readBarcodesDetailFromDatabase(barcodes){
    let cartItemDetails = new Array();
    for(let index = 0;index<barcodes.length;index++){
        cartItemDetails.push(readDatabase(barcodes[index]));
    }
    return cartItemDetails;

}

function calcuateTheReceiptPrice(cartItems,cartItemDetails){
    let cartItemDetailsWithTotalPrice = new Array();
    for(let index = 0;index<cartItems.length;index++){
        for(let cartItemDetailIndex=0;cartItemDetailIndex<cartItemDetails.length;cartItemDetailIndex++){
            if(cartItems[index].barCode===cartItemDetails[cartItemDetailIndex].barCode){
                let cartItemDetailWithTotalPrice = new Object();
                cartItemDetailWithTotalPrice.barCode = cartItemDetails[cartItemDetailIndex].barCode;
                cartItemDetailWithTotalPrice.name=cartItemDetails[cartItemDetailIndex].name;
                cartItemDetailWithTotalPrice.quantity = cartItems[index].num;
                cartItemDetailWithTotalPrice.unitPrice=cartItemDetails[cartItemDetailIndex].unitPrice;
                cartItemDetailWithTotalPrice.totalPrice = cartItemDetails[cartItemDetailIndex].unitPrice*cartItems[index].num;
                cartItemDetailsWithTotalPrice.push(cartItemDetailWithTotalPrice);
                break;
            }
            
        }
        
    }
    return cartItemDetailsWithTotalPrice;
}

function calcuateTheTotalPrice(cartItemDetailsWithTotalPrice){
    let totalPrice = 0;
    for(let index = 0;index<cartItemDetailsWithTotalPrice.length;index++){
        totalPrice +=cartItemDetailsWithTotalPrice[index].totalPrice;
    }
    return totalPrice;

}

function generateReceipts(cartItemDetailsWithTotalPrice){
    let receiptDetails = new Array();
    for(let index = 0;index<cartItemDetailsWithTotalPrice.length;index++){
        let receipt = `name:${cartItemDetailsWithTotalPrice[index].name},Quantity: ${cartItemDetailsWithTotalPrice[index].quantity}, Unit price: ${cartItemDetailsWithTotalPrice[index].unitPrice} (yuan), Subtotal: ${cartItemDetailsWithTotalPrice[index].totalPrice} (yuan)\n`
        receiptDetails.push(receipt);
    }
    return receiptDetails;
}

function formatData(receiptDetails,totalPrice){
    let receipt = "***<store earning no money>Receipt ***\n";
    for(let index = 0;index<receiptDetails.length;index++){
        receipt += receiptDetails[index];
    }
    receipt += "----------------------\n";
    receipt += "Total: " + totalPrice + " (yuan)\n";
    receipt += "**********************";
    return receipt;
}

function readDatabase(barcode){
    let cartItemDetail = new Object();
    switch(barcode){
        case "ITEM000000" : 
            cartItemDetail.barCode = "ITEM000000";
            cartItemDetail.name = "Coca-Cola";
            cartItemDetail.unitPrice = 3;
            break;
        case "ITEM000001" : 
            cartItemDetail.barCode = "ITEM000001";
            cartItemDetail.name = "Sprite";
            cartItemDetail.unitPrice = 3;
            break;
        case "ITEM000002" : 
            cartItemDetail.barCode = "ITEM000002";
            cartItemDetail.name = "Apple";
            cartItemDetail.unitPrice = 5;
            break;
        case "ITEM000003" : 
            cartItemDetail.barCode = "ITEM000003";
            cartItemDetail.name = "Litchi";
            cartItemDetail.unitPrice = 15;
            break;
        case "ITEM000004" : 
            cartItemDetail.barCode = "ITEM000004";
            cartItemDetail.name = "Battery";
            cartItemDetail.unitPrice = 2;
            break;
        case "ITEM000005" : 
            cartItemDetail.barCode = "ITEM000005";
            cartItemDetail.name = "Instant Noodles";
            cartItemDetail.unitPrice = 4;
            break;
    }
    return cartItemDetail;
}

printReceipt([
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000001',
    'ITEM000001',
    'ITEM000004'
  ]);


