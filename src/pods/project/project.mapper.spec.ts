import * as viewModel from './project.vm';
import * as apiModel from './api/project.api-model';
import { mapProjectFromApiToVm } from './project.mapper';

describe('Exercise 1 - testing for project.mapper', () => {
  it('should return a empty project if the entry is a undefined value', () => {
    // ARRANGE
    const project = undefined;

    // ACT
    const result = mapProjectFromApiToVm(project);

    // ASSERT
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('should return a empty project if the entry is a null value', () => {
    // ARRANGE
    const project = null;

    // ACT
    const result = mapProjectFromApiToVm(project);

    // ASSERT
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('should return expected result with null employee list', () => {
    // ARRANGE
    const resultExpect: viewModel.Project = {
      id: '001',
      name: 'john doe',
      externalId: '002',
      comments: 'comment example',
      isActive: true,
      employees: [],
    };
    const project: apiModel.Project = {
      id: '001',
      name: 'john doe',
      externalId: '002',
      comments: 'comment example',
      isActive: true,
      employees: null,
    };

    // ACT
    const result = mapProjectFromApiToVm(project);

    // ASSERT
    expect(result).toEqual(resultExpect);
  });

  it('should return expected result with undefined employee list', () => {
    // ARRANGE
    const resultExpect: viewModel.Project = {
      id: '001',
      name: 'john doe',
      externalId: '002',
      comments: 'comment example',
      isActive: true,
      employees: [],
    };
    const project: apiModel.Project = {
      id: '001',
      name: 'john doe',
      externalId: '002',
      comments: 'comment example',
      isActive: true,
      employees: undefined,
    };

    // ACT
    const result = mapProjectFromApiToVm(project);

    // ASSERT
    expect(result).toEqual(resultExpect);
  });

  it('should return expected result with a correct entry values', () => {
    // ARRANGE
    const resultExpect: viewModel.Project = {
      id: '001',
      name: 'john doe',
      externalId: '002',
      comments: 'comment example',
      isActive: true,
      employees: [
        {
          id: '001',
          isAssigned: true,
          employeeName: 'john doe',
        },
      ],
    };
    const project: apiModel.Project = {
      id: '001',
      name: 'john doe',
      externalId: '002',
      comments: 'comment example',
      isActive: true,
      employees: [
        {
          id: '001',
          isAssigned: true,
          employeeName: 'john doe',
        },
      ],
    };

    // ACT
    const result = mapProjectFromApiToVm(project);

    // ASSERT
    expect(result).toEqual(resultExpect);
  });
});
