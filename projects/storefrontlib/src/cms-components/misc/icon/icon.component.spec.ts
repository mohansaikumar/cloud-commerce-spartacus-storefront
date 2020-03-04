import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from './icon-loader.service';
import { IconComponent } from './icon.component';
import { ICON_TYPE } from './icon.model';
import { IconModule } from './icon.module';

@Component({
  selector: 'cx-icon-test',
  template: `
    <cx-icon type="CART"></cx-icon>
    <button cxIcon="CART"></button>
    <div cxIcon type="CART"></div>
    <p class="original" cxIcon="CART"></p>
  `,
})
class MockIconTestComponent {}

export class MockIconLoaderService {
  getStyleClasses(iconType: ICON_TYPE) {
    return iconType;
  }
  getHtml(icon: ICON_TYPE) {
    return `<p>${icon}</p>`;
  }
  addLinkResource() {}
}

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  let service: IconLoaderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [IconComponent],
      providers: [
        { provide: IconLoaderService, useClass: MockIconLoaderService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(IconLoaderService);
    spyOn(service, 'addLinkResource').and.callThrough();
  });

  describe('controller', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should not have a default icon', () => {
      expect(component.icon).toBeFalsy();
    });

    it('should create an icon based on type input', () => {
      expect(component.icon).toBeFalsy();
      component.type = ICON_TYPE.CART;
      expect(component.icon).toEqual('<p>CART</p>');
    });

    it('should create an icon based on cxIcon input', () => {
      expect(component.icon).toBeFalsy();
      component.cxIcon = ICON_TYPE.AMEX;
      expect(component.icon).toEqual('<p>AMEX</p>');
    });

    it('should create an icon based multiple inputs', () => {
      expect(component.icon).toBeFalsy();
      component.type = ICON_TYPE.CART;
      component.cxIcon = ICON_TYPE.AMEX;
      expect(component.icon).toEqual('<p>AMEX</p>');
    });

    it('should not create an icon for null value', () => {
      component.type = null;
      expect(component.icon).toBeFalsy();
    });

    it(`should not create an icon for '' value`, () => {
      component.type = <any>'';
      expect(component.icon).toBeFalsy();
    });
  });

  describe('UI tests', () => {
    let debugElement: DebugElement;

    beforeEach(() => {
      debugElement = fixture.debugElement;
    });

    it('should add CSS class to host element', () => {
      component.type = ICON_TYPE.CART;
      fixture.detectChanges();
      const classList = (debugElement.nativeElement as HTMLElement).classList;
      expect(classList).toContain('cx-icon');
      expect(classList).toContain('CART');
    });

    it('should add multiple CSS classes to host element', () => {
      spyOn(service, 'getStyleClasses').and.returnValue('multiple classes');
      component.type = ICON_TYPE.CART;
      fixture.detectChanges();
      const classList = (debugElement.nativeElement as HTMLElement).classList;
      expect(classList).toContain('cx-icon');
      expect(classList).toContain('multiple');
      expect(classList).toContain('classes');
    });

    it('should call addLinkResource', () => {
      component.type = ICON_TYPE.CART;
      fixture.detectChanges();
      expect(service.addLinkResource).toHaveBeenCalled();
    });
  });
});

describe('host icon components', () => {
  let hostComponent: MockIconTestComponent;
  let service: IconLoaderService;
  let fixture: ComponentFixture<MockIconTestComponent>;
  let debugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IconModule],
      declarations: [MockIconTestComponent],
      providers: [
        { provide: IconLoaderService, useClass: MockIconLoaderService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    service = TestBed.inject(IconLoaderService);

    spyOn(service, 'getStyleClasses').and.returnValue('font based');
    spyOn(service, 'addLinkResource').and.callThrough();
    fixture = TestBed.createComponent(MockIconTestComponent);
    hostComponent = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(hostComponent).toBeTruthy();
  });

  describe('font based icons', () => {
    beforeEach(() => {
      fixture.detectChanges();
      debugElement = fixture.debugElement;
      service = TestBed.inject(IconLoaderService);
    });

    it('should not render an inline svg object', () => {
      const element = debugElement.query(By.css('svg'));
      expect(element).toBeFalsy();
    });

    it('should add resource for all icons (4 times)', () => {
      expect(service.addLinkResource).toHaveBeenCalledTimes(4);
    });

    it('should add the symbol classes for the icon component classlist', () => {
      const element = debugElement.query(By.css('cx-icon'));
      expect(element.nativeElement.classList).toContain('font');
      expect(element.nativeElement.classList).toContain('based');
    });

    it('should add the symbol classes to a button with cxIcon attribute', () => {
      const element = debugElement.query(By.css('button'));
      expect(element.nativeElement.classList).toContain('cx-icon');
      expect(element.nativeElement.classList).toContain('font');
      expect(element.nativeElement.classList).toContain('based');
    });

    it('should use type attribute as an input for cxIcon directive', () => {
      const element = debugElement.query(By.css('div'));
      expect(element.nativeElement.classList).toContain('cx-icon');
      expect(element.nativeElement.classList).toContain('font');
      expect(element.nativeElement.classList).toContain('based');
    });

    it('should remain existing classes on the host element', () => {
      const element = debugElement.query(By.css('p'));
      expect(element.nativeElement.classList).toContain('cx-icon');
      expect(element.nativeElement.classList).toContain('font');
      expect(element.nativeElement.classList).toContain('based');
      expect(element.nativeElement.classList).toContain('original');
    });
  });
});
