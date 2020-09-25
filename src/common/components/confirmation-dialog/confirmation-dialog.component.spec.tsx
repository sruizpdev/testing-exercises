import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import userEvent from '@testing-library/user-event';

describe('Exercise 2 - test for confirmation dialog component', () => {
  it('should show a dialog when isOpen value is true', () => {
    // ARRANGE
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'One title',
      labels: {
        closeButton: 'Close button',
        acceptButton: 'Accept button',
      },
    };

    // ACT
    render(<ConfirmationDialogComponent {...props} />);

    const dialog = screen.getByRole('dialog');
    const title = screen.getByText('One title');
    const acceptBtn = screen.getByRole('button', {
      name: 'Accept button',
    });
    const cancelBtn = screen.getByRole('button', {
      name: 'Close button',
    });

    // ASSERT
    expect(dialog).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H2');
    expect(cancelBtn).toBeInTheDocument();
    expect(cancelBtn.tagName).toBe('BUTTON');
    expect(acceptBtn).toBeInTheDocument();
    expect(acceptBtn.tagName).toBe('BUTTON');
  });

  it('when isOpen is false, should not display dialog ', () => {
    // ARRANGE
    const props = {
      isOpen: false,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'One title',
      labels: {
        closeButton: 'Close button',
        acceptButton: 'Accept button',
      },
    };

    // ACT
    render(<ConfirmationDialogComponent {...props} />);

    const dialog = screen.queryByRole('dialog');

    // ASSERT
    expect(dialog).toEqual(null);
  });
  it('should call onAccept when cancel button is clicked', () => {
    // ARRANGE
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'One title',
      labels: {
        closeButton: 'Close button',
        acceptButton: 'Accept button',
      },
    };

    // ACT
    render(<ConfirmationDialogComponent {...props} />);

    const closeBtn = screen.getByRole('button', {
      name: 'Close button',
    });
    userEvent.click(closeBtn);

    // ASSERT
    expect(props.onClose).toHaveBeenCalled();
    expect(closeBtn).toBeInTheDocument();
  });

  it('should call onAccept when accept button is clicked', () => {
    // ARRANGE
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'One title',
      labels: {
        closeButton: 'Close button',
        acceptButton: 'Accept button',
      },
    };

    // ACT
    render(<ConfirmationDialogComponent {...props} />);

    const acceptBtn = screen.getByRole('button', {
      name: 'Accept button',
    });
    userEvent.click(acceptBtn);

    // ASSERT
    expect(props.onAccept).toHaveBeenCalled();
    expect(acceptBtn).toBeInTheDocument();
  });
});
