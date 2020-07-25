import { createAction, props } from '@ngrx/store';
import { Course } from './model/course';


export const getCourses = createAction(
  '[Courses] - get course list'
);

export const getCoursesSuccess = createAction(
  '[Courses] - get course list success',
  props<{data: Course[]}>()
);

export const getCoursesFail = createAction(
  '[Courses] - get course list fails',
  props<{ error: any }>()
);
