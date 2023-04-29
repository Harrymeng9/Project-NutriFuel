describe('Testing', function () {

  test("Increase value by one", () => {
    var addOne = function (value) {
      return value + 1;
    };
    expect(addOne(1)).toBe(2);
  });
})