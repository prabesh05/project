@extends('layouts.app')

@section('title', 'Courses List')

@section('content')
<div class="card">
    <div class="header-actions">
        <h2>Courses</h2>
        <a href="{{ route('courses.create') }}" class="btn btn-primary">Add New Course</a>
    </div>

    @if($courses->count() > 0)
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Credits</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach($courses as $course)
                <tr>
                    <td>{{ $course->id }}</td>
                    <td>{{ $course->code }}</td>
                    <td>{{ $course->name }}</td>
                    <td>{{ $course->credits }}</td>
                    <td>
                        <div class="actions">
                            <a href="{{ route('courses.show', $course) }}" class="btn btn-primary">View</a>
                            <a href="{{ route('courses.edit', $course) }}" class="btn btn-warning">Edit</a>
                            <form action="{{ route('courses.destroy', $course) }}" method="POST" style="display: inline;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure?')">Delete</button>
                            </form>
                        </div>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <div class="pagination">
            {{ $courses->links() }}
        </div>
    @else
        <p>No courses found. <a href="{{ route('courses.create') }}">Add a new course</a></p>
    @endif
</div>
@endsection
