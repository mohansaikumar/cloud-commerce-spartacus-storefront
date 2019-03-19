import { TestBed } from '@angular/core/testing';
import { TranslationService } from './translation.service';
import createSpy = jasmine.createSpy;
import { ServerConfig } from '../config';
import { I18NextService } from './i18next/i18next.service';

const testKey = 'testNamespace:testKey';
const testOptions = 'testOptions';
const nonBreakingSpace = String.fromCharCode(160);

describe('TranslationService', () => {
  let service: TranslationService;
  let config: ServerConfig;
  let i18NextService;

  beforeEach(() => {
    const mockI18NextService = {
      t: createSpy('i18Next.t'),
      exists: createSpy('i18Next.exists'),
      loadNamespaces: createSpy('i18Next.loadNamespaces')
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: I18NextService,
          useValue: mockI18NextService
        },
        { provide: ServerConfig, useValue: { production: false } },
        TranslationService
      ]
    });

    service = TestBed.get(TranslationService);
    i18NextService = TestBed.get(I18NextService);
    config = TestBed.get(ServerConfig);
  });

  describe('exists', () => {
    it('should call i18NextService.exists', () => {
      service.exists(testKey, testOptions);
      expect(i18NextService.exists).toHaveBeenCalledWith(testKey, testOptions);
    });
  });

  describe('loadNamespaces', () => {
    it('should call i18NextService.loadNamespaces', () => {
      const namespaces = ['namespace1', 'namespace2'];
      const testCallback = () => {};
      service.loadNamespaces(namespaces, testCallback);
      expect(i18NextService.loadNamespaces).toHaveBeenCalledWith(
        namespaces,
        testCallback
      );
    });
  });

  describe('translate', () => {
    describe(', when key exists,', () => {
      beforeEach(() => {
        i18NextService.exists.and.returnValue(true);
      });

      it('should emit result of i18NextService.t', () => {
        i18NextService.t.and.returnValue('value');
        let result;
        service.translate(testKey, testOptions).subscribe(x => (result = x));

        expect(i18NextService.t).toHaveBeenCalledWith(testKey, testOptions);
        expect(result).toBe('value');
      });
    });

    describe(', when key does NOT exist,', () => {
      beforeEach(() => {
        i18NextService.exists.and.returnValue(false);
        spyOn(console, 'warn');
      });

      it('should emit non-breaking space until namespace is laded', () => {
        let result;
        service.translate(testKey, testOptions).subscribe(x => (result = x));
        expect(result).toBe(nonBreakingSpace);
      });

      it('should NOT report missing key', () => {
        service.translate(testKey, testOptions);
        expect(console.warn).not.toHaveBeenCalled();
      });

      it('should load namespace of key', () => {
        service.translate(testKey, testOptions).subscribe();

        expect(i18NextService.loadNamespaces).toHaveBeenCalledWith(
          'testNamespace',
          jasmine.any(Function)
        );
      });
    });

    describe(', when key does NOT exist even after namespace was loaded,', () => {
      beforeEach(() => {
        i18NextService.exists.and.returnValues(false, false);
        spyOn(console, 'warn');
        i18NextService.loadNamespaces.and.callFake(
          (_namespaces, onNamespaceLoad) => onNamespaceLoad()
        );
      });

      it('should report missing key', () => {
        service.translate(testKey, testOptions).subscribe();
        expect(console.warn).toHaveBeenCalled();
      });

      it('should emit key in brackets for non-production', () => {
        let result;
        service.translate(testKey, testOptions).subscribe(x => (result = x));
        expect(result).toBe(`[testNamespace:testKey]`);
      });

      it('should return non-breaking space for production', () => {
        config.production = true;
        let result;
        service.translate(testKey, testOptions).subscribe(x => (result = x));

        expect(result).toBe(nonBreakingSpace);
      });
    });

    describe(', when key does NOT exist firstly, but it comes with loaded namespace,', () => {
      beforeEach(() => {
        i18NextService.exists.and.returnValues(false, true);
        spyOn(console, 'warn');
        i18NextService.loadNamespaces.and.callFake(
          (_namespaces, onNamespaceLoad) => {
            onNamespaceLoad();
          }
        );
      });

      it('should NOT report missing key', () => {
        service.translate(testKey, testOptions).subscribe();
        expect(console.warn).not.toHaveBeenCalled();
      });

      it('should return result of i18NextService.t', () => {
        let result;
        i18NextService.t.and.returnValue('value');
        service.translate(testKey, testOptions).subscribe(x => (result = x));

        expect(i18NextService.t).toHaveBeenCalledWith(testKey, testOptions);
        expect(result).toBe('value');
      });
    });
  });
});
