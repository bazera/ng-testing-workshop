import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';
import { HighlightDirective } from './posts/post/highlight.directive';
import { ExpandedPanelPipe } from './pipes/expanded-panel.pipe';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FilterItemsPipe } from './pipes/filter-items.pipe';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AboutUsComponent,
    ContactComponent,
    HomeComponent,
    PostsComponent,
    PostComponent,
    HighlightDirective,
    ExpandedPanelPipe,
    FilterItemsPipe,
    AuthComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormlyModule.forRoot(), ReactiveFormsModule, FormlyBootstrapModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
