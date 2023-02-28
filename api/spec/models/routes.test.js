const mongoose = require('mongoose');

require('../mongodb_helper');

const Route = require('../../models/routes');

describe('Location model', () => {
  beforeEach(async () => {
    await mongoose.connection.collections.routes.drop(() => {});
  });

  it('has a name', () => {
    const route = new Route({
      name: 'Central London',
      bio: 'bio',
      time: '1 hour',
      locations: [new mongoose.Types.ObjectId()],
    });
    expect(route.name).toBe('Central London');
  });

  it('has a bio', () => {
    const route = new Route({
      name: 'Central London',
      bio: 'bio',
      time: '1 hour',
      locations: [new mongoose.Types.ObjectId()],
    });
    expect(route.bio).toBe('bio');
  });

  it('has a time', () => {
    const route = new Route({
      name: 'Central London',
      bio: 'bio',
      time: '1 hour',
      locations: [new mongoose.Types.ObjectId()],
    });
    expect(route.time).toBe('1 hour');
  });

  it('has a location', () => {
    let location1 = new mongoose.Types.ObjectId();
    let location2 = new mongoose.Types.ObjectId();

    const route = new Route({
      name: 'Central London',
      bio: 'bio',
      time: '1 hour',
      locations: [location1, location2],
    });
    expect(route.locations.toObject()).toEqual([location1, location2]);
  });

  it('can save a route', async () => {
    const route = new Route({
      name: 'Central London',
      bio: 'bio',
      time: '1 hour',
      locations: [
        mongoose.Types.ObjectId('63fe0ec6e05e8904bff1e679'),
        mongoose.Types.ObjectId('63fe0f27e05e8904bff1e67b'),
      ],
    });
    await route.save();

    let routes = await Route.find();
    expect(routes[0].name).toBe('Central London');
  });
});
