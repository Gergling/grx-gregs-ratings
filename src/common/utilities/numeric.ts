export const getLargestPrimeFactor = (n: number) => {
  let i=2;
  while (i<=n){
    if (n%i == 0){
      n/=i;    
    }else{
      i++;
    }
  }
  return i;
};
