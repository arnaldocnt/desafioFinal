const numero = 52998224725;
const array = Array.from(String(numero), (Number));
const soma1 = ((array[0]*10)+(array[1]*9)+(array[2]*8)+(array[3]*7)+(array[4]*6)+(array[5]*5)+(array[6]*4)+(array[7]*3)+(array[8]*2));
const soma2 = ((array[0]*11)+(array[1]*10)+(array[2]*9)+(array[3]*8)+(array[4]*7)+(array[5]*6)+(array[6]*5)+(array[7]*4)+(array[8]*3)+(array[9]*2));
console.log(soma1);
console.log(soma2);

const resto1 = (soma1*10%11);
if(resto1 === 10)  resto1 = 10;
console.log(resto1);

const resto2 = (soma2*10%11);
if(resto2 === 10) resto2 = 10;
console.log(resto2);

if( resto1 === array[9] && resto2 === array[10]){
  console.log('CPF verdadeiro')
} else {
  console.log('CPF errado')
}
