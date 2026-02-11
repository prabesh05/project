@extends('layouts.app')

@section('title', 'Create Course')

@section('content')
<div class="card">
    <h2>Create New Course</h2>

    @if($errors->any())
        <div class="alert alert-error">
            <ul>
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('courses.store') }}" method="POST">
        @csrf

        <div class="form-group">
            <label for="name">Course Name *</label>
            <input type="text" id="name" name="name" class="form-control" value="{{ old('name') }}" required>
        </div>

        <div class="form-group">
            <label for="code">Course Code *</label>
            <input type="text" id="code" name="code" class="form-control" value="{{ old('code') }}" required>
        </div>

        <div class="form-group">
            <label for="credits">Credits *</label>
            <input type="number" id="credits" name="credits" class="form-control" value="{{ old('credits', 3) }}" min="1" max="6" required>
        </div>

        <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" name="description" class="form-control" rows="4">{{ old('description') }}</textarea>
        </div>

        <div class="actions">
            <button type="submit" class="btn btn-success">Create Course</button>
            <a href="{{ route('courses.index') }}" class="btn btn-danger">Cancel</a>
        </div>
    </form>
</div>
@endsection
