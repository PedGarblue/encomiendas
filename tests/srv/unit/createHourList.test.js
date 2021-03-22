const createHourList = require('@/srv/utils/createHourList');

describe('createHourList()', () => {
  it('creates successfully a hour list to 08:00AM to 08:00PM', () => {
    const list = createHourList();
    const hasValidHours = list.every(item => /^[0-2]?[0-9]:[0-5][0-9](AM|PM)$/.test(item)); 
    expect(hasValidHours).toBeTruthy();
    expect(list[0]).toEqual('08:00AM');
    expect(list[list.length - 1]).toEqual('08:00PM');
  });
});