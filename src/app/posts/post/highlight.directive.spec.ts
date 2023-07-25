import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';
import { Component, DebugElement, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: ` <div appHighlight color="blue"></div> `,
})
class HostComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighlightDirective, HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    el = fixture.debugElement.query(By.directive(HighlightDirective));

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new HighlightDirective(el);
    expect(directive).toBeTruthy();
  });

  it('should highlight host on hover', () => {
    el.triggerEventHandler('mouseover', null);
    fixture.detectChanges();

    expect(el.nativeElement.style.backgroundColor).toBe('blue');
  });

  it('should remove highlight from host on mouse leave', () => {
    el.triggerEventHandler('mouseover', null);
    fixture.detectChanges();

    el.triggerEventHandler('mouseleave', null);
    fixture.detectChanges();

    expect(el.nativeElement.style.backgroundColor).toBe('');
  });
});
