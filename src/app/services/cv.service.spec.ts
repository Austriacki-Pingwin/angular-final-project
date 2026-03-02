// 🔥 Частичный mock Firestore (сохраняем injectable Firestore)
jest.mock('@angular/fire/firestore', () => {
  const actual = jest.requireActual('@angular/fire/firestore');

  return {
    ...actual,
    collection: jest.fn(),
    doc: jest.fn(() => ({ id: 'mocked-cv-id' })),
    arrayUnion: jest.fn(),
    arrayRemove: jest.fn(),
    updateDoc: jest.fn(),
    Timestamp: {
      now: jest.fn(() => new Date()),
    },
  };
});

import { TestBed } from '@angular/core/testing';
import { of, throwError, firstValueFrom } from 'rxjs';
import { CvService } from './cv.service';
import { ProfileService } from './profile.service';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { arrayRemove, Firestore } from '@angular/fire/firestore';
import { updateDoc, arrayUnion } from '@angular/fire/firestore';

describe('CvService', () => {
  let service: CvService;

  const profileServiceMock = {
    getBlock: jest.fn(),
    getBlocks: jest.fn(),
    createBlock: jest.fn(),
    deleteBlock: jest.fn(),
  };

  const authServiceMock = {
    uid$: of('user-123'),
  };

  const notificationServiceMock = {
    success: jest.fn(),
    error: jest.fn(),
  };

  const firestoreMock = {};

  beforeEach(() => {
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        CvService,
        { provide: ProfileService, useValue: profileServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: NotificationService, useValue: notificationServiceMock },
        { provide: Firestore, useValue: firestoreMock },
      ],
    });

    service = TestBed.inject(CvService);
  });

  // базовая проверка
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // deleteCv — success
  it('should call deleteBlock with correct args', async () => {
    profileServiceMock.deleteBlock.mockReturnValue(of(void 0));

    await firstValueFrom(service.deleteCv('cv-1'));

    expect(profileServiceMock.deleteBlock).toHaveBeenCalledWith('cvs', 'cv-1');
  });

  // deleteCv — error
  it('should propagate error if deleteBlock fails', async () => {
    const error = new Error('Delete failed');

    profileServiceMock.deleteBlock.mockReturnValue(throwError(() => error));

    await expect(firstValueFrom(service.deleteCv('cv-1'))).rejects.toThrow('Delete failed');
  });

  // createCv — success
  it('should create CV and return generated id', async () => {
    profileServiceMock.createBlock.mockReturnValue(of(void 0));

    const result = await firstValueFrom(service.createCv('My CV'));

    expect(profileServiceMock.createBlock).toHaveBeenCalled();
    expect(result).toBe('mocked-cv-id');
  });

  // createCv — error
  it('should call notificationService.error if creation fails', (done) => {
    profileServiceMock.createBlock.mockReturnValue(throwError(() => new Error('Create failed')));

    service.createCv('Test').subscribe({
      complete: () => {
        expect(notificationServiceMock.error).toHaveBeenCalledWith(
          'Could not create CV. Please try again',
        );
        done();
      },
    });
  });

  // 🔹 duplicateCv — success
  it('should duplicate CV with new id', async () => {
    const originalCv = {
      id: 'old-id',
      title: 'Old CV',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    profileServiceMock.getBlock.mockReturnValue(of(originalCv));
    profileServiceMock.createBlock.mockReturnValue(of(void 0));

    await firstValueFrom(service.duplicateCv('old-id'));

    // проверяем, что createBlock вызвался
    expect(profileServiceMock.createBlock).toHaveBeenCalled();

    const createdArg = profileServiceMock.createBlock.mock.calls[0][1];

    // новый id должен быть mocked-cv-id
    expect(createdArg.id).toBe('mocked-cv-id');
  });

  // 🔹 duplicateCv — success notification
  it('should call notificationService.success on success', async () => {
    const originalCv = {
      id: 'old-id',
      title: 'Old CV',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    profileServiceMock.getBlock.mockReturnValue(of(originalCv));
    profileServiceMock.createBlock.mockReturnValue(of(void 0));

    await firstValueFrom(service.duplicateCv('old-id'));

    expect(notificationServiceMock.success).toHaveBeenCalledWith('CV successfully duplicated');
  });

  // 🔹 duplicateCv — error case
  it('should call notificationService.error on failure', (done) => {
    profileServiceMock.getBlock.mockReturnValue(throwError(() => new Error('Duplicate failed')));

    service.duplicateCv('old-id').subscribe({
      complete: () => {
        expect(notificationServiceMock.error).toHaveBeenCalledWith(
          'Could not create duplicate. Please try again',
        );
        done();
      },
    });
  });

  // getBlockDataForProfile() should mark block as checked if id exists in cv
  it('should mark block as checked if id exists in cv', async () => {
    const cvMock = {
      skillsBlock: ['skill-1'],
    };

    const blocksMock = [
      { id: 'skill-1', name: 'Angular' },
      { id: 'skill-2', name: 'React' },
    ];

    profileServiceMock.getBlock.mockReturnValue(of(cvMock));
    profileServiceMock.getBlocks.mockReturnValue(of(blocksMock));

    const result = await firstValueFrom(service.getBlockDataForProfile('skills', 'cv-1'));

    expect(result[0].isChecked).toBe(true);
    expect(result[1].isChecked).toBe(false);
  });

  // getBlockDataForProfile() should mark block as unchecked if id does not exist in cv
  it('should mark block as unchecked if id not in cv', async () => {
    const cvMock = {
      skillsBlock: [],
    };

    const blocksMock = [{ id: 'skill-1', name: 'Angular' }];

    profileServiceMock.getBlock.mockReturnValue(of(cvMock));
    profileServiceMock.getBlocks.mockReturnValue(of(blocksMock));

    const result = await firstValueFrom(service.getBlockDataForProfile('skills', 'cv-1'));

    expect(result[0].isChecked).toBe(false);
  });

  // getBlockDataForProfile()should return empty array if no blocks
  it('should return empty array if no blocks', async () => {
    const cvMock = {
      skillsBlock: ['skill-1'],
    };

    profileServiceMock.getBlock.mockReturnValue(of(cvMock));
    profileServiceMock.getBlocks.mockReturnValue(of([]));

    const result = await firstValueFrom(service.getBlockDataForProfile('skills', 'cv-1'));

    expect(result).toEqual([]);
  });

  //   addBlockToCv() should call updateDoc with arrayUnion
  it('should call updateDoc with arrayUnion', async () => {
    (updateDoc as jest.Mock).mockResolvedValue(void 0);

    await firstValueFrom(service.addBlockToCv('skills', 'skill-1', 'cv-1'));

    expect(arrayUnion).toHaveBeenCalledWith('skill-1');
    expect(updateDoc).toHaveBeenCalled();
  });

  //   addBlockToCv() should call success notification
  it('should call success notification', async () => {
    (updateDoc as jest.Mock).mockResolvedValue(void 0);

    await firstValueFrom(service.addBlockToCv('skills', 'skill-1', 'cv-1'));

    expect(notificationServiceMock.success).toHaveBeenCalledWith('Block added successfully');
  });

  //   addBlockToCv() should call error notification if update fails
  it('should call error notification if update fails', (done) => {
    (updateDoc as jest.Mock).mockRejectedValue(new Error('Update failed'));

    service.addBlockToCv('skills', 'skill-1', 'cv-1').subscribe({
      complete: () => {
        expect(notificationServiceMock.error).toHaveBeenCalledWith(
          'Could not add skill. Please try again: Update failed',
        );
        done();
      },
    });
  });

  //   deleteBlockFromCv()should call updateDoc with arrayRemove
  it('should call updateDoc with arrayRemove', async () => {
    (updateDoc as jest.Mock).mockResolvedValue(void 0);

    await firstValueFrom(service.deleteBlockFromCv('skills', 'skill-1', 'cv-1'));

    expect(arrayRemove).toHaveBeenCalledWith('skill-1');
    expect(updateDoc).toHaveBeenCalled();
  });

  //   deleteBlockFromCv()should call success notification
  it('should call success notification', async () => {
    (updateDoc as jest.Mock).mockResolvedValue(void 0);

    await firstValueFrom(service.deleteBlockFromCv('skills', 'skill-1', 'cv-1'));

    expect(notificationServiceMock.success).toHaveBeenCalledWith('Block deleted successfully');
  });

  //   deleteBlockFromCv() should call error notification if update fails
  it('should call error notification if update fails', (done) => {
    (updateDoc as jest.Mock).mockRejectedValue(new Error('Update failed'));

    service.deleteBlockFromCv('skills', 'skill-1', 'cv-1').subscribe({
      complete: () => {
        expect(notificationServiceMock.error).toHaveBeenCalledWith(
          'Could not add skill. Please try again: Update failed',
        );
        done();
      },
    });
  });
});
