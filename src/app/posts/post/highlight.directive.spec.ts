import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

@Component({
  template: `<div appHighlight color="blue"></div>`,
})
class HostComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent, HighlightDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    el = fixture.debugElement.query(By.directive(HighlightDirective));

    fixture.detectChanges();
  });

  it('should create directive instance', () => {
    const directive = new HighlightDirective(el);
    expect(directive).toBeTruthy();
  });

  it('should highlight host on hover', () => {
    el.triggerEventHandler('mouseover');
    fixture.detectChanges();

    expect(el.nativeElement.style.backgroundColor).toBe('blue');
  });

  it('should remove highlight from host on mouse leave', () => {
    el.triggerEventHandler('mouseover');
    fixture.detectChanges();

    el.triggerEventHandler('mouseleave');
    fixture.detectChanges();

    expect(el.nativeElement.style.backgroundColor).toBe('');
  });
});
