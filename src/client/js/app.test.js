const { random_item, addDate, dateList, betweenDates, cleanSpace1, cleanSpace2 } = require('./app');
// const {cleanSpace1} = require('./app')
// const {cleanSpace2} = require('./app')


test('Spacing cleaning helpers', () => {
    expect(
        cleanSpace1('Johor Bahru').toBe('Johor%20Bahru')
    );

    expect(
      cleanSpace2('Johor Bahru').toBe('Johor-Bahru')
  );
})

// test()