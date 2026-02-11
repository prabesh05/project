@extends('layouts.app')

@section('title', 'Enrollment Details')

@section('content')
<div class="card">
    <div class="header-actions">
        <h2>Enrollment Details</h2>
        <div class="actions">
            <a href="{{ route('enrollments.edit', $enrollment) }}" class="btn btn-warning">Edit</a>
            <a href="{{ route('enrollments.index') }}" class="btn btn-primary">Back to List</a>
        </div>
    </div>

    <table>
        <tr>
            <th style="width: 200px;">ID</th>
            <td>{{ $enrollment->id }}</td>
        </tr>
        <tr>
            <th>Student</th>
            <td>
                <a href="{{ route('students.show', $enrollment->student) }}">
                    {{ $enrollment->student->name }} ({{ $enrollment->student->enrollment_number }})
                </a>
            </td>
        </tr>
        <tr>
            <th>Course</th>
            <td>
                <a href="{{ route('courses.show', $enrollment->course) }}">
                    {{ $enrollment->course->code }} - {{ $enrollment->course->name }}
                </a>
            </td>
        </tr>
        <tr>
            <th>Enrollment Date</th>
            <td>{{ $enrollment->enrollment_date->format('M d, Y') }}</td>
        </tr>
        <tr>
            <th>Grade</th>
            <td>{{ $enrollment->grade ?? 'Not graded yet' }}</td>
        </tr>
        <tr>
            <th>Created At</th>
            <td>{{ $enrollment->created_at->format('M d, Y H:i') }}</td>
        </tr>
        <tr>
            <th>Updated At</th>
            <td>{{ $enrollment->updated_at->format('M d, Y H:i') }}</td>
        </tr>
    </table>
</div>
@endsection
