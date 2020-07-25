import { Component, OnInit } from '@angular/core';
import { compareCourses, Course } from '../model/course';
import { Observable } from 'rxjs';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { map, shareReplay, tap, filter } from 'rxjs/operators';
import { CoursesHttpService } from '../services/courses-http.service';
import { Store, select } from '@ngrx/store';
import { CourseState } from '../reducer';
import { getCourses } from '../course.actions';
import { selectCourse, selectCourseLoading, selectBegginer, selectAdvanced, selectPromo } from '../course.selectors';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number> = this.store.pipe(select(selectPromo));
  loading$: Observable<boolean> = this.store.pipe(select(selectCourseLoading));;
  beginnerCourses$: Observable<Course[]> = this.store.pipe(select(selectBegginer));;
  advancedCourses$: Observable<Course[]> = this.store.pipe(select(selectAdvanced));

  constructor(
    private dialog: MatDialog,
    // private coursesHttpService: CoursesHttpService,
    private store: Store<CourseState>
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.store.dispatch(getCourses());
    // this.coursesHttpService.findAllCourses().pipe(
    //   map((courses) => courses.sort(compareCourses)),
    //   tap(courseList => this.store.dispatch(getCourses({data: courseList})))
    // ).subscribe();
    // const courses$ = this.store.select('courses').pipe(
    //   filter(state => !!state.courseList),
    //   map(state => state.courseList)
    // );

    // const courses$ = this.store.pipe(select(selectCourse));

    // this.loading$ = courses$.pipe(map((courses) => !!courses));

    // this.loading$ = this.store.pipe(select(selectCourseLoading));

    // this.beginnerCourses$ = courses$.pipe(
    //   map((courses) =>
    //     courses.filter((course) => course.category === 'BEGINNER')
    //   )
    // );
    // this.beginnerCourses$ = this.store.pipe(select(selectBegginer));

    // this.advancedCourses$ = courses$.pipe(
    //   map((courses) =>
    //     courses.filter((course) => course.category === 'ADVANCED')
    //   )
    // );
    // this.advancedCourses$ = this.store.pipe(select(selectAdvanced));

    // this.promoTotal$ = courses$.pipe(
    //   map((courses) => courses.filter((course) => course.promo).length)
    // );

    // this.promoTotal$ = this.store.pipe(select(selectPromo));
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create',
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
