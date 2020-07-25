import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { getCourses, getCoursesSuccess, getCoursesFail } from './course.actions';
import { CoursesHttpService } from './services/courses-http.service';
import { of } from 'rxjs';
import { compareCourses } from './model/course';


@Injectable()
export class CourseEffect {

  getCourses$ = createEffect(
    () => this.actions$.pipe(
      ofType(getCourses),
      switchMap(
        () => this.courseService.findAllCourses().pipe(
          map((courses) => courses.sort(compareCourses)),
          map(courseList => getCoursesSuccess({data: courseList})),
          catchError((error) => of(getCoursesFail({error: error.error})))
        )
      )
    )
  );

  constructor(private actions$: Actions, private courseService: CoursesHttpService) {}
}
