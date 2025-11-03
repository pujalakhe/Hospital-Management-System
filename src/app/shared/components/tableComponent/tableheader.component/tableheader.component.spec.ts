import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableheaderComponent } from './tableheader.component';
import { MatIconModule } from '@angular/material/icon';

describe('TableheaderComponent', () => {
  let component: TableheaderComponent;
  let fixture: ComponentFixture<TableheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableheaderComponent, MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TableheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default tableTitle and buttonLabel', () => {
    expect(component.tableTitle).toBe('');
    expect(component.buttonLabel).toBe('Add');
  });

  it('should update tableTitle and buttonLabel via inputs', () => {
    component.tableTitle = 'My Table';
    component.buttonLabel = 'Submit';
    fixture.detectChanges();

    expect(component.tableTitle).toBe('My Table');
    expect(component.buttonLabel).toBe('Submit');
  });

  it('should emit buttonClicked event when onActionClick is called', () => {
    spyOn(component.buttonClicked, 'emit');

    component.onActionClick();

    expect(component.buttonClicked.emit).toHaveBeenCalled();
  });
});
