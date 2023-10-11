function nautilusfFriendlyBox(box) {
    let newBox = JSON.parse(JSON.stringify(box));
    newBox.value = newBox.value.toString();
    if (newBox.assets === undefined) newBox.assets = [];
    for (let i = 0; i < newBox.assets.length; i++) {
        newBox.assets[i].amount = newBox.assets[i].amount.toString();
    }
    return newBox;
}

export async function fetchContractBoxes(contract:string):Promise<Array<any>>{
    const url = `https://api.ergoplatform.com/api/v1/boxes/unspent/byAddress/${contract}`
    const response  = await fetch(url)
    if (response.status == 200) {
        const data = await response.json();
        return data.items.map(nautilusfFriendlyBox);
    }else{
        return []
    }
}