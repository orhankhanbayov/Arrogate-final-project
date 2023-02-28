const mongoose = require('mongoose');

require('../mongodb_helper');
const Location = require('../../models/location');

describe('Location model', () => {
  beforeEach(async () => {
    await mongoose.connection.collections.locations.drop(() => {});
  });

  it('has a name', () => {
    const location = new Location({
      name: 'Big Ben',
      coordinates: { type: 'Point', coordinates: [1, 1] },
      clue1: 'Clue 1',
      clue2: 'Clue 2',
      clue3: 'Clue 3',
    });
    expect(location.name).toBe('Big Ben');
  });
  it('has a coordinate', () => {
    const location = new Location({
      name: 'Big Ben',
      coordinates: { type: 'Point', coordinates: [1, 1] },
      clue1: 'Clue 1',
      clue2: 'Clue 2',
      clue3: 'Clue 3',
    });
    expect(location.coordinates).toEqual({
      coordinates: [1, 1],
      type: 'Point',
    });
  });

  it('has 3 clues', () => {
    const location = new Location({
      name: 'Big Ben',
      coordinates: { type: 'Point', coordinates: [1, 1] },
      clue1: 'Clue 1',
      clue2: 'Clue 2',
      clue3: 'Clue 3',
    });
    expect(location.clue1).toBe('Clue 1');
    expect(location.clue2).toBe('Clue 2');
    expect(location.clue3).toBe('Clue 3');
  });

  it('can save a location', (done) => {
    const location = new Location({
      name: 'Big Ben',
      coordinates: { type: 'Point', coordinates: [1, 1] },
      clue1: 'Clue 1',
      clue2: 'Clue 2',
      clue3: 'Clue 3',
    });

    location.save((err) => {
      expect(err).toBeNull();

      Location.find((err, locations) => {
        expect(err).toBeNull();

        expect(locations[0]).toMatchObject({
          name: 'Big Ben',
          coordinates: { type: 'Point', coordinates: [1, 1] },
          clue1: 'Clue 1',
          clue2: 'Clue 2',
          clue3: 'Clue 3',
        });
        done();
      });
    });
  });
});
