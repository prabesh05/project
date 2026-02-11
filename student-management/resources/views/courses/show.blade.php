@extends('layouts.app')

@section('title', 'Course Details')

@section('content')
<div class="card">
    <div class="header-actions">
        <h2>Course Details</h2>
        <div class="actions">
            <a href="{{ route('courses.edit', $course) }}" class="btn btn-warning">Edit</a>
            <a href="{{ route('courses.index') }}" class="btn btn-primary">Back to List</a>
        </div>
    </div>

    <table>
        <tr>
            <th style="width: 200px;">ID</th>
            <td>{{ $course->id }}</td>
        </tr>
        <tr>
            <th>Course Code</th>
            <td>{{ $course->code }}</td>
        </tr>
        <tr>
            <th>Course Name</th>
            <td>{{ $course->name }}</td>
        </tr>
        <tr>
            <th>Credits</th>
            <td>{{ $course->credits }}</td>
        </tr>
        <tr>
            <th>Description</th>
            <td>{{ $course->description ?? 'N/A' }}</td>
        </tr>
        <tr>
            <th>Created At</th>
            <td>{{ $course->created_at->format('M d, Y H:i') }}</td>
        </tr>
        <tr>
            <th>Updated At</th>
            <td>{{ $course->updated_at->format('M d, Y H:i') }}</td>
        </tr>
    </table>

    @if($course->enrollments->count() > 0)
        <h3 style="margin-top: 2rem;">Enrolled Students</h3>
        <table>
            <thead>
                <tr>
                    <th>Enrollment Number</th>
                    <th>Student Name</th>
                    <th>Enrollment Date</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                @foreach($course->enrollments as $enrollment)
                <tr>
                    <td>{{ $enrollment->student->enrollment_number }}</td>
                    <td>{{ $enrollment->student->name }}</td>
                    <td>{{ $enrollment->enrollment_date->format('M d, Y') }}</td>
                    <td>{{ $enrollment->grade ?? 'Not graded' }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    @else
        <p style="margin-top: 2rem;">No students enrolled in this course yet.</p>
    @endif
</div>
@endsection
