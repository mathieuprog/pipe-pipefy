import { pipe, pipeAsync, pipefy } from './index';

test('pipe', () => {
  const getName = (person) => person.name;
  const uppercase = (string) => string.toUpperCase();
  const repeat = (string, n) => (string + ' ').repeat(n).trimEnd();

  const person = { name: 'Mathieu' };

  const result =
    pipe(
      getName,
      uppercase,
      pipefy(repeat, 2)
    )(person);

  expect(result).toBe('MATHIEU MATHIEU');
});

test('pipeAsync', async () => {
  const getName = (person) => person.name;
  const uppercase = (string) => string.toUpperCase();
  const repeat = (string, n) => (string + ' ').repeat(n).trimEnd();

  const uppercaseAfterTimeout = (string) => new Promise(resolve => setTimeout(() => resolve(uppercase(string)), 50));

  const person = { name: 'Mathieu' };

  const result =
    await pipeAsync(
      getName,
      uppercaseAfterTimeout,
      pipefy(repeat, 2)
    )(person);

  expect(result).toBe('MATHIEU MATHIEU');
});
