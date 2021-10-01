import * as moment from 'moment'
function DateFormatter(date:any,type:any):any{
  let ReturnDate:any=null
  switch (type) {
    case 'normal':
        ReturnDate=moment(date).format('LLL')       
    break;
    case 'medium':
        ReturnDate=moment(date).format('DD-MM-YY h:mm:ss a')     
    break;
    case 'long':
        ReturnDate=moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')     
    break;
    default:
    break;
  }
  return ReturnDate
}

function RemoveDuplicate(unfilterdArr:any[]){
  let data:any[];
  data= unfilterdArr.filter(function(item, index) {
    if (unfilterdArr.indexOf(item) == index)
      return item;
  });
  return data;

}


const Utility = {
   DateFormatter,
   RemoveDuplicate
}
export default Utility;