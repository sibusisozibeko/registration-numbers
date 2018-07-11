describe('The RegiStration function', function(){

    it('must show registration numbers from Cape Town ', function(){
      var Reg = RegiStration({"CA 3443":0,"CA 87643":0,"CA 3973":0});

      assert.deepEqual({"CA 3443": 0 ,"CA 87643":0 , "CA 3973":0}, Reg.regMap());

    });
});
