@extends('layouts.app')

@section('title', 'Edit Course')

@section('content')
<div class="card">
    <h2>Edit Course</h2>

    @if($errors->any())
        <div class="alert alert-error">
            <ul>
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('courses.update', $course) }}" method="POST">
        @csrf
        @method('PUT')

        <div class="form-group">
            <label for="name">Course Name *</label>
            <input type="text" id="name" name="name" class="form-control" value="{{ old('name', $course->name) }}" required>
        </div>

        <div class="form-group">
            <label for="code">Course Code *</label>
            <input type="text" id="code" name="code" class="form-control" value="{{ old('code', $course->code) }}" required>
        </div>

        <div class="form-group">
            <label for="credits">Credits *</label>
            <input type="number" id="credits" name="credits" class="form-control" value="{{ old('credits', $course->credits) }}" min="1" max="6" required>
        </div>

        <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" name="description" class="form-control" rows="4">{{ old('description', $course->description) }}</textarea>
        </div>

        <div class="actions">
            <button type="submit" class="btn btn-success">Update Course</button>
            <a href="{{ route('courses.index') }}" class="btn btn-danger">Cancel</a>
        </div>
    </form>
</div>
@endsection
