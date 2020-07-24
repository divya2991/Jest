const RangeList = require('./RangeList');

const rl = new RangeList();
test('add ranges', () => {
    r1.add([1,5]);
    expect(r1.print()).toBe([1,5]);

    r1.add([10,20]);
    expect(r1.print()).toBe([1,5][10,20]);

    r1.add([20,20]);
    expect(r1.print()).toBe([1,5][10,20]);

    r1.add([20,21]);
    expect(r1.print()).toBe([1,5][10,21]);

    r1.add([25,50]); //Scenario 1 - test outside the already existing range
    expect(r1.print()).toBe([1,5][10,21]); // The range is not added as 25 & 50 are outside the existing range

    r1.add([4,45]); //Scenario 2 - add a broader range and check if the existing range gets extended
    expect(r1.print().toBe([1,45])); //since [10,21) is within [4,45], the range should get added to the existing range
    
    //Testing the feature - Parameters that aren't supplied will have the undefined value in Javascript
    r1.add(); //Scenario 3 - not passing any range. So the range is undefined.
    expect(r1.print()).toBe([1,45]); //undefined range so nothing gets added

});

test('remove ranges', () => {
    r1.remove([1,3]); //Scenario 4 - remove range from existing range
    expect(r1.print()).toBe([3,45]); //remove[1,3] will remove 1,2 from the range [1,45)

    //Testing the feature - Parameters that aren't supplied will have the undefined value in Javascript
    r1.remove(); //Scenario 5 - not passing any range. So the range is undefined.
    expect(r1.print()).toBe([3,45]); //undefined range so nothing gets removed
});

test('error messages', () => {
    try {
        r1.add([e,r]); //if numeric range is not passed
      } catch (error) {
        console.error(error);
      }
});