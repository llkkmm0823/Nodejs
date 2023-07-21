function test( x, y, done ){  // done  < (a,b)=>{return a+b}
    const result = done( x, y );
    console.log( `${x}+${y}=${result}`);
}

test(10, 20, (a,b)=>{return a+b} );