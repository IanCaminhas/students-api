

function sum(a: number, b:number){
    return a+b;
}


describe('Aylton base teste suite', () =>{
    it('should return 4', ()=>{
        const response = sum(2,2);
        expect(response).toBe(4);
    });
});