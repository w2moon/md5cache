import {expect} from "chai";
import {MD5Storage} from "../src/MD5Storage";
import * as wlutil from "wlutil";
  
describe("存储测试",()=>{

    it('在temp中创建新的存储空间',()=>{
       // expect(game.getValueAutoUnit(new jsbn.BigInteger("0"))).equal("0");
        let storage = new MD5Storage("temp");
    });
});