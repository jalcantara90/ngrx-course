import { CourseState, selectAll } from './reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';

const selectCourseState = createFeatureSelector<CourseState>('courses');

// export const selectCourse = createSelector(
//   selectCourseState,
//   state => state.courseList
// );

export const selectCourse = createSelector(
  selectCourseState,
  selectAll
);

export const selectBegginer = createSelector(
  selectCourse,
  (courseList) => courseList.filter((course) => course.category === 'BEGINNER')
);

export const selectAdvanced = createSelector(
  selectCourse,
  (courseList) => courseList.filter((course) => course.category === 'ADVANCED')
);

export const selectPromo = createSelector(
  selectCourse,
  (courseList) => courseList.filter((course) => course.promo).length
);

export const selectCourseLoading = createSelector(
  selectCourse,
  (courseList) => !!courseList
);
