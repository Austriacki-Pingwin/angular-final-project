import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { CvCardComponent } from './cv-card.component';
import { CvService } from '../../services/cv.service';
import { Router } from '@angular/router';
import type { FullCV } from '../../models/cv.model';
import { Timestamp } from '@angular/fire/firestore';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('CvCardComponent', () => {
  let component: CvCardComponent;
  let fixture: ComponentFixture<CvCardComponent>;

  let cvServiceMock: {
    deleteCv: jest.Mock;
    duplicateCv: jest.Mock;
  };

  const routerMock = {
    navigate: jest.fn(),
  };

  const mockCv: FullCV = {
    id: 'cv-1',
    title: 'Test CV',
    photo: [],
    personal: [],
    about: [],
    links: [],
    experience: [],
    education: [],
    languages: [],
    skills: [],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };

  beforeEach(async () => {
    cvServiceMock = {
      deleteCv: jest.fn(() => of(void 0)),
      duplicateCv: jest.fn(() => of(void 0)),
    };

    await TestBed.configureTestingModule({
      imports: [CvCardComponent, TranslateModule.forRoot()],
      providers: [
        { provide: CvService, useValue: cvServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CvCardComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('cv', mockCv);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate progress on changes', () => {
    expect(component.progress).toBeDefined();
  });

  it('should call deleteCv on delete', () => {
    component.deleteCv();
    expect(cvServiceMock.deleteCv).toHaveBeenCalledWith('cv-1');
  });

  it('should emit download event', () => {
    const spy = jest.spyOn(component.download, 'emit');

    component.onDownload();

    expect(spy).toHaveBeenCalledWith('cv-1');
  });

  it('should navigate to creator on openCreator', () => {
    component.openCreator();
    expect(routerMock.navigate).toHaveBeenCalledWith(['creator', 'cv-1']);
  });

  it('should call duplicateCv', () => {
    component.duplicateCv();
    expect(cvServiceMock.duplicateCv).toHaveBeenCalledWith('cv-1');
  });
});
