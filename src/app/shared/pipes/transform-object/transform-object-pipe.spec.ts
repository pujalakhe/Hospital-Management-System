import { TransformObjectPipe } from './transform-object-pipe';

describe('TransformObjectPipe', () => {
  it('create an instance', () => {
    const pipe = new TransformObjectPipe();
    expect(pipe).toBeTruthy();
  });
});
