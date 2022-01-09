import React, { useState } from "react"

const Robocontest = () => {
    const [son, setSon] = useState('12345')
    let ss = []
    function exer1() {

        let s = 0

        let lenth = son.length
        for (let i = 0; i < son.length; i++) {
            s += parseInt(son[i])
        }
        for (let i = 0; i < son.length; i++) {
            ss.push(parseInt(s - son[i]))
        }

        ss.sort()
        console.log(ss[0] + "  " + ss[lenth - 1]);
    }
    exer1();

    const [son1, setSon1] = useState('1123234')
    let sss = []
    let er = []
    let len = son1.length
    function exer2() {
        for (let i = 0; i < son1.length; i++) {
            sss.push(parseInt(son1[i]))
        }

        // for (let j = i+1; j < len - 1; j++) {
                   
        // }
        console.log(er);
    }


    exer2();
    return (<>
        <div>
            {ss}
        </div>
    </>);
}
export default Robocontest;