export const convertNumbers=(number)=>{

    let numberWithCommas=number.toLocaleString();
    let arr=numberWithCommas.split(",");

    if(arr.length>=5)
    {
        //Trilian
        return arr[0]+"."+arr[1].slice(0,2)+"T";
    }
    else if(arr.length==4)
    {
        //Billion.
        return arr[0]+"."+arr[1].slice(0,2)+"B";
    }
    else if(arr.length==3)
    {
        //Million.
        return arr[0]+"."+arr[1].slice(0,2)+"M";
    }
    else if(arr.length==2)
    {
        //Thousand.
        return arr[0]+"."+arr[1].slice(0,2)+"K";
    }
    else
    {
        //Hundred.
        return numberWithCommas;

    }

}