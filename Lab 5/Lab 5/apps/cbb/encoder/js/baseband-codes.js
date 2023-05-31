//SUBIECT DE EXAMEN
function getManchesterLevelEncoding(bits) {
    var result = [];
    for (var i = 0; i < bits.length; i++) {
        let symbol = '⚋⚋';
        if (parseInt(bits[i].value) == 1) symbol = '▁∣▔';
        if (parseInt(bits[i].value) == 1 && i > 0 && parseInt(bits[i - 1].value) == 1) symbol = '∣▁∣▔';
        if (parseInt(bits[i].value) == 0) symbol = '▔∣▁';
        if (parseInt(bits[i].value) == 0 && i > 0 && parseInt(bits[i - 1].value) == 0) symbol = '∣▔∣▁';
        result.push(symbol);
    }
    return result;
}

function getNRZL (bits) {
    var result = [];
    var prev  = '_';

    for(var i = 0 ; i < bits.length; i++){
         let symbol = '⚋⚋';
      
         if(parseInt(bits[i].value)==1){
         if(prev == '_'){
            symbol = '|▔';
            prev = '▔';
         } else {
                symbol = '|__';
                prev = '▁';
        }
        }else {
            if(prev == '▁')
                symbol = '▁▁';
                else 
                symbol = '▔▔';
        }
        result.push(symbol);
    }
    return result;
}

