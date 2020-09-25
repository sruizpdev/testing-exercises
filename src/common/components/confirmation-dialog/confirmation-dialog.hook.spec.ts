import { createEmptyLookup, Lookup } from 'common/models';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { renderHook, act } from '@testing-library/react-hooks';

describe('Exercise 3 - test for confirmation dialog hook', () => {
  it('when is called, should return an object with initial values', () => {
    // ARRANGE
    const firstItem: Lookup = createEmptyLookup();

    // ACT
    const { result } = renderHook(() => useConfirmationDialog());

    // ASSERT
    expect(result.current.isOpen).toBeFalsy();
    expect(result.current.itemToDelete).toEqual(firstItem);
    expect(result.current.onClose).toEqual(expect.any(Function));
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });

  it('should update isOpen if onCancel is called', () => {
    // ARRANGE
    const itemToDelete: Lookup = {
      id: '001',
      name: 'John Doe',
    };

    // ACT
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(itemToDelete);
    });
    expect(result.current.isOpen).toBeTruthy();
    act(() => {
      result.current.onClose();
    });

    // ASSERT
    expect(result.current.isOpen).toBeFalsy();
  });
  it('should update itemToDelete if onAccept is called', () => {
    // ARRANGE
    const itemToDelete: Lookup = {
      id: '001',
      name: 'John Doe',
    };

    // ACT
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(itemToDelete);
    });
    expect(result.current.itemToDelete).toEqual(itemToDelete);
    act(() => {
      result.current.onAccept();
    });

    // ASSERT
    expect(result.current.itemToDelete).toEqual({
      id: '',
      name: '',
    });
  });
  it('if onOpenDialog it called -> should update isOpen and itemToDelete', () => {
    // ARRANGE
    const itemToDelete: Lookup = {
      id: '001',
      name: 'John Doe',
    };

    // ACT
    const { result } = renderHook(() => useConfirmationDialog());
    expect(result.current.itemToDelete).toEqual({
      id: '',
      name: '',
    });
    expect(result.current.isOpen).toBeFalsy();
    act(() => {
      result.current.onOpenDialog(itemToDelete);
    });

    // ASSERT
    expect(result.current.isOpen).toBeTruthy();
    expect(result.current.itemToDelete).toEqual(itemToDelete);
  });
});
