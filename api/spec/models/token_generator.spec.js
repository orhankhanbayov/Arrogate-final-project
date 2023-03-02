const TokenGenerator = require('../../models/token_generator');
const JWT = require('jsonwebtoken');
jest.useFakeTimers().setSystemTime(new Date('2023-02-21'));

describe('TokenGenerator', () => {
  describe('jsonwebtoken', () => {
    test('returns a token containing user_id that is valid for 2 weeks', () => {
      const user_id = 1;
      const token = TokenGenerator.jsonwebtoken(user_id);
      const payload = JWT.decode(token, process.env.JWT_SECRET);
      expect(payload.user_id).toEqual(user_id);
      expect(payload.exp - payload.iat).toEqual(166016842560);
    });
  });
});
