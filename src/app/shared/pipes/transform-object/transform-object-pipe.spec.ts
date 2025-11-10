import { Role } from '../../model/role.model';
import { TransformRolePipe } from './transform-object-pipe';

describe('TransformRolePipe', () => {
  let pipe: TransformRolePipe;

  beforeEach(() => {
    pipe = new TransformRolePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should transform Role array to {id, name} array', () => {
    const roles: Role[] = [
      { key: 1, value: 'Admin' },
      { key: 2, value: 'Employee' },
    ];

    const transformed = pipe.transform(roles);

    expect(transformed).toEqual([
      { id: 1, name: 'Admin' },
      { id: 2, name: 'Employee' },
    ]);
  });
  it('should return empty array if input is empty', () => {
    const transformed = pipe.transform([]);
    expect(transformed).toEqual([]);
  });
});
