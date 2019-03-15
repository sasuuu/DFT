class Complex{
    constructor(a,b){
        this.re = a;
        this.im = b;
    }

    add(c){
        this.re += c.re;
        this.im += c.im;
        return this;
    }

    mult(c){
        let re = this.re * c.re - this.im * c.im;
        let im = this.re * c.im + this.im * c.re;
        return new Complex(re,im);
    }
}

function dft(x){
    let fourier = [];
    const N = x.length;
    for(let k=0;k<N;k++){
        let sum = new Complex(0,0);
        for(let n=0;n<N;n++){
            const phi = (TWO_PI*k*n)/N;
            let c = new Complex(cos(phi),-sin(phi));
            sum.add(x[n].mult(c));
        }
        sum.re = sum.re/N;
        sum.im = sum.im/N;
        let amp = sqrt(sum.re*sum.re+sum.im*sum.im);
        let freq = k;
        let phase = atan2(sum.im,sum.re);
        fourier[k] = {re: sum.re,im: sum.im,amp,freq,phase};
    }
    return fourier;
}